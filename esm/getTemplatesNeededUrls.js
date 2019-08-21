"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pMap = _interopRequireDefault(require("p-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTemplatesNeededUrls = async (supplies, needs) => {
  const tpls = await (0, _pMap.default)(needs, async ign => supplies.find(dl => dl.includes(`${ign}.gitignore`)), {
    concurrency: 8
  });
  return tpls;
};

var _default = getTemplatesNeededUrls;
exports.default = _default;
module.exports = exports.default;