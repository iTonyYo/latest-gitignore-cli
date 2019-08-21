"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("./utilities/isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = twd => ({
  twd: (0, _isEmpty.default)(twd) ? process.cwd() : twd,
  cwd: process.cwd()
});

exports.default = _default;
module.exports = exports.default;