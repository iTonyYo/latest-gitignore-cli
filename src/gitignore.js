import { realpathSync } from 'fs';

import isReachable from 'is-reachable';

import dirExists from './dirExists';
import fastGitignore from './fastGitignore';

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
 *
 * @param {Array} ignores - 需被忽 Git 忽略的内容的主题
 * @param {String} to - `.gitignore` 文件存储位置
 * @param {Object} options - 选项（prefer: 强制使用本地的模板）
 */
const gitignore = async (ignores, to, options) => {
  try {
    if (!(await dirExists(to))) {
      throw Error('保存位置必须有效');
    }

    // 最快，fastGitignore，fg
    if (!(await isReachable('https://api.github.com'))) {
      await fastGitignore(ignores, to);
    }

    // 最新，latestGitignore，lg
    if (await isReachable('https://api.github.com')) {

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
