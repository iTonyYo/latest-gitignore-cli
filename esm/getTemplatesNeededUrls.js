"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pMap = _interopRequireDefault(require("p-map"));

var _find = _interopRequireDefault(require("lodash/find"));

var _includes = _interopRequireDefault(require("lodash/includes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTemplatesNeededUrls = async (supplies, needs) => {
  try {
    return await (0, _pMap.default)(needs, async ign => (0, _find.default)(supplies, dl => (0, _includes.default)(dl, `${ign}.gitignore`)), {
      concurrency: 8
    });
  } catch (err) {
    throw err;
  }
};

var _default = getTemplatesNeededUrls;
exports.default = _default;
module.exports = exports.default;