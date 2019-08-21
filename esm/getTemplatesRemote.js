"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _batchGot = _interopRequireDefault(require("./batchGot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTemplatesRemote = async urls => {
  const batched = await (0, _batchGot.default)(urls, {
    concurrency: 8
  });
  return batched.join('\n\n\n');
};

var _default = getTemplatesRemote;
exports.default = _default;
module.exports = exports.default;