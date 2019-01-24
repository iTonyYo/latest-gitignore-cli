"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _join = _interopRequireDefault(require("lodash/join"));

var _batchGot = _interopRequireDefault(require("./batchGot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTemplatesRemote = async urls => {
  try {
    return (0, _join.default)((await (0, _batchGot.default)(urls, {
      concurrency: 8
    })), '\n\n\n');
  } catch (error) {
    throw error;
  }
};

var _default = getTemplatesRemote;
exports.default = _default;
module.exports = exports.default;