"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const flattenDeep = arr => Array.isArray(arr) ? arr.reduce((a, b) => a.concat(flattenDeep(b)), []) : [arr];

var _default = flattenDeep;
exports.default = _default;
module.exports = exports.default;