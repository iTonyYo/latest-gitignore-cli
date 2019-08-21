"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (obj, path, defaultValue = null) => String.prototype.split.call(path, /[,[\].]+?/).filter(Boolean).reduce((a, c) => Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue, obj);

exports.default = _default;
module.exports = exports.default;