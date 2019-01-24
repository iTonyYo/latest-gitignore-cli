"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pStat = _interopRequireDefault(require("./pStat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: 待 `fs Promises` 接口稳定后使用
 * 参见 https://goo.gl/xtwgwG
 */
const dirExists = async path => {
  try {
    const stat = await (0, _pStat.default)(path);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
};

var _default = dirExists;
exports.default = _default;
module.exports = exports.default;