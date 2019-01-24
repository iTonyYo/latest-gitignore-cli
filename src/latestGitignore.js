import { realpathSync } from 'fs';

import isReachable from 'is-reachable';
import debug from 'debug';

import dirExists from './dirExists';
import generateGitignore from './generateGitignore';

const log = debug('LG:log');

/**
 * latestGitignore(needs, to);
 *
 * @param {Array} needs - 需被 Git 忽略的内容主题
 * @param {String} to - `.gitignore` 文件存储位置
 */
export default async (needs, to) => {
  try {
    if (!(await dirExists(to))) {
      throw Error('保存位置必须有效');
    }
    log('保存位置有效');

    if (!(await isReachable('https://api.github.com'))) {
      throw Error('访问 `github/gitignore` 项目时出现故障');
    }
    log('可以访问 `github/gitignore` 项目');

    await generateGitignore(needs, to);

    return {
      message: '成功添加 `.gitignore` 文件',
      out: realpathSync(to),
    };
  } catch (error) {
    throw error;
  }
};
