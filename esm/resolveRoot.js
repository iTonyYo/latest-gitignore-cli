"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

const resolveRoot = (relativePath, base) => (0, _path.resolve)((0, _fs.realpathSync)(base), relativePath);

var _default = resolveRoot;
exports.default = _default;
module.exports = exports.default;