"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _isReachable = _interopRequireDefault(require("is-reachable"));

var _debug = _interopRequireDefault(require("debug"));

var _dirExists = _interopRequireDefault(require("./dirExists"));

var _generateGitignore = _interopRequireDefault(require("./generateGitignore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('LG:log');
/**
 * latestGitignore(needs, to);
 *
 * @param {Array} needs - 需被 Git 忽略的内容主题
 * @param {String} to - `.gitignore` 文件存储位置
 */

var _default = async ({
  needs = [],
  to = '.'
}) => {
  if (!(await (0, _dirExists.default)(to))) {
    throw Error('保存位置必须有效');
  }

  log('保存位置有效');

  if (!(await (0, _isReachable.default)('https://api.github.com'))) {
    throw Error('访问 `github/gitignore` 项目时出现故障');
  }

  log('可以访问 `github/gitignore` 项目');
  await (0, _generateGitignore.default)(needs, to);
  return {
    message: '成功添加 `.gitignore` 文件',
    out: (0, _fs.realpathSync)(to)
  };
};

exports.default = _default;
module.exports = exports.default;