/**
 * TODO: 待 `fs Promises` 接口稳定后使用
 * 参见 https://goo.gl/xtwgwG
 */

import pStat from './pStat';

const dirExists = async (path) => {
  try {
    const stat = await pStat(path);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
};

export default dirExists;
