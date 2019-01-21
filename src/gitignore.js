/**
 * LOGIC:
 *
 * - 获取配置中指定 `.gitignore` 模板的下载地址列表
 * - 根据这个列表下载模板数据
 * - 将下载到的模板数据拼合并写入 `.gitignore` 文件
 */

import { realpathSync } from 'fs';
import { promisify } from 'util';

import isReachable from 'is-reachable';
import join from 'lodash/join';
import writeFileAtomic from 'write-file-atomic';
import isNil from 'lodash/isNil';
import includes from 'lodash/includes';
import find from 'lodash/find';
import pMap from 'p-map';
import cacheManager from 'cache-manager';
import fsStore from 'cache-manager-fs';

import dirExists from './dirExists';
import getAllDownloadUrls from './getAllDownloadUrls';
import batchGot from './batchGot';
import resolveRoot from './resolveRoot';

let diskCache;

// 参见 https://git.io/fhzoI
const initCache = () => new Promise((resolve) => {
  diskCache = cacheManager.caching({
    store: fsStore,
    options: {
      ttl: 60 * 2,
      maxsize: 1000 * 1000,
      path: resolveRoot('.cache', '.'),
      preventfill: false,
      fillcallback: () => {
        resolve();
      },
    },
  });
});

const getUrls = async (allUrls, ignores) => {
  try {
    return await pMap(
      ignores,
      async ign => find(
        allUrls,
        dl => includes(dl, `${ign}.gitignore`),
      ),
      { concurrency: 8 },
    );
  } catch (err) {
    throw err;
  }
};

/**
 * LOGIC:
 *
 * 下载列表缓存
 *
 *   - 无
 *     - 获取远程下载列表
 *     - 将下载列表保存至本地缓存，有效时间 60 秒
 *     - 将需要的模板下载下来 & 写入指定位置的 `.gitignore` 文件
 *
 *   - 有
 *     - 将需要的模板下载下来 & 写入指定位置的 `.gitignore` 文件
 * 
 * TODO: 缓存下载的每个模板文件
 */
const gitignore = async (ignores, to) => {
  try {
    if (!(await dirExists(to))) {
      throw Error('保存位置必须有效');
    }

    await initCache();
    const pCacheGet = promisify(diskCache.get);
    const pCacheSet = promisify(diskCache.set);

    const cache = await pCacheGet('allDownloadUrls');

    if (isNil(cache)) {
      console.log('操作远程下载列表');
      if (!(await isReachable('https://api.github.com'))) {
        throw Error('连接不到 `https://api.github.com`');
      }

      const allDownloadUrls = await getAllDownloadUrls();

      const sc = pCacheSet('allDownloadUrls', allDownloadUrls);
      const wf = writeFileAtomic(
        resolveRoot('.gitignore', to),
        join(
          await batchGot(
            await getUrls(allDownloadUrls, ignores),
            {
              concurrency: 8,
              got: {
                headers: {
                  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                },
              },
            },
          ),
          '\n\n\n',
        ),
        {},
        (err) => {
          if (err) {
            throw err;
          }
        },
      );

      await sc;
      await wf;
    }

    if (!isNil(cache)) {
      console.log('操作本地下载列表');
      const allDownloadUrls = await pCacheGet('allDownloadUrls');
      await writeFileAtomic(
        resolveRoot('.gitignore', to),
        join(
          await batchGot(
            await getUrls(allDownloadUrls, ignores),
            {
              concurrency: 8,
            },
          ),
          '\n\n\n',
        ),
        {},
        (err) => {
          if (err) {
            throw err;
          }
        },
      );
    }

    return {
      message: '成功添加 `.gitignore` 文件',
      out: realpathSync(to),
    };
  } catch (err) {
    throw err;
  }
};

export default gitignore;
