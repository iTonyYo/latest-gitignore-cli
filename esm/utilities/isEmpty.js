"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

exports.default = _default;
module.exports = exports.default;