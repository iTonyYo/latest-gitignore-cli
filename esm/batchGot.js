"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pMap = _interopRequireDefault(require("p-map"));

var _got = _interopRequireDefault(require("got"));

var _get = _interopRequireDefault(require("./utilities/get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// batchGot(urls, {got: {}, concurrency: 8})
const batchGot = async (urls, options) => {
  const done = await (0, _pMap.default)(urls, async url => (0, _get.default)((await (0, _got.default)(url, options.got)), 'body'), {
    concurrency: options.concurrency
  });
  return done;
};

var _default = batchGot;
exports.default = _default;
module.exports = exports.default;