"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("util");

var _debug = _interopRequireDefault(require("debug"));

var _isEmpty = _interopRequireDefault(require("./utilities/isEmpty"));

var _initFsCache = _interopRequireDefault(require("./initFsCache"));

var _getTemplatesAllUrls = _interopRequireDefault(require("./getTemplatesAllUrls"));

var _getTemplatesNeededUrls = _interopRequireDefault(require("./getTemplatesNeededUrls"));

var _getTemplatesRemote = _interopRequireDefault(require("./getTemplatesRemote"));

var _resolveRoot = _interopRequireDefault(require("./resolveRoot"));

var _saveFile = _interopRequireDefault(require("./saveFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('LG:log');
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

var _default = async (needs, to) => {
  const diskCache = await (0, _initFsCache.default)();
  const pCacheGet = (0, _util.promisify)(diskCache.get);
  const pCacheSet = (0, _util.promisify)(diskCache.set);
  const savingDir = (0, _resolveRoot.default)('.gitignore', to);
  log(`保存至 ${savingDir}`);
  const cacheDownloadList = await pCacheGet('allDownloadUrls');

  if ((0, _isEmpty.default)(cacheDownloadList)) {
    log('远程获取下载列表');
    const allDownloadUrls = await (0, _getTemplatesAllUrls.default)();
    const targets = await (0, _getTemplatesNeededUrls.default)(allDownloadUrls, needs);
    log(`待下载 ${targets.length} 个模板`);
    const sc = pCacheSet('allDownloadUrls', allDownloadUrls);
    const wf = (0, _saveFile.default)((await (0, _getTemplatesRemote.default)(targets)), savingDir);
    await sc;
    await wf;
  }

  if (!(0, _isEmpty.default)(cacheDownloadList)) {
    log('从缓存中获取下载列表');
    const allDownloadUrls = await pCacheGet('allDownloadUrls');
    const targets = await (0, _getTemplatesNeededUrls.default)(allDownloadUrls, needs);
    log(`待下载 ${targets.length} 个模板`);
    await (0, _saveFile.default)((await (0, _getTemplatesRemote.default)(targets)), savingDir);
  }
};

exports.default = _default;
module.exports = exports.default;