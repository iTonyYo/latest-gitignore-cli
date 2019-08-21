import { promisify } from 'util';

import debug from 'debug';

import isEmpty from './utilities/isEmpty';
import initFsCache from './initFsCache';
import getTemplatesAllUrls from './getTemplatesAllUrls';
import getTemplatesNeededUrls from './getTemplatesNeededUrls';
import getTemplatesRemote from './getTemplatesRemote';
import resolveRoot from './resolveRoot';
import saveFile from './saveFile';

const log = debug('LG:log');

/**
 * generateGitignore(needs, to)
 *
 * LOGIC:
 *
 * 下载列表缓存
 *
 *   - 无
 *     - 获取远程下载列表
 *     - 将下载列表保存至本地缓存，有效时间 120 秒
 *     - 将需要的模板下载下来 & 写入指定位置的 `.gitignore` 文件
 *
 *   - 有
 *     - 将需要的模板下载下来 & 写入指定位置的 `.gitignore` 文件
 *
 * TODO: 缓存下载的每个模板文件
 *
 * @param {Array} needs - 需被 Git 忽略的内容主题
 * @param {String} to - `.gitignore` 文件存储位置
 */
export default async (needs, to) => {
  const diskCache = await initFsCache();
  const pCacheGet = promisify(diskCache.get);
  const pCacheSet = promisify(diskCache.set);

  const savingDir = resolveRoot('.gitignore', to);
  log(`保存至 ${savingDir}`);

  const cacheDownloadList = await pCacheGet('allDownloadUrls');

  if (isEmpty(cacheDownloadList)) {
    log('远程获取下载列表');

    const allDownloadUrls = await getTemplatesAllUrls();
    const targets = await getTemplatesNeededUrls(
      allDownloadUrls,
      needs,
    );
    log(`待下载 ${targets.length} 个模板`);

    const sc = pCacheSet('allDownloadUrls', allDownloadUrls);
    const wf = saveFile(
      await getTemplatesRemote(targets),
      savingDir,
    );

    await sc;
    await wf;
  }

  if (!isEmpty(cacheDownloadList)) {
    log('从缓存中获取下载列表');

    const allDownloadUrls = await pCacheGet('allDownloadUrls');
    const targets = await getTemplatesNeededUrls(
      allDownloadUrls,
      needs,
    );
    log(`待下载 ${targets.length} 个模板`);

    await saveFile(
      await getTemplatesRemote(targets),
      savingDir,
    );
  }
};
