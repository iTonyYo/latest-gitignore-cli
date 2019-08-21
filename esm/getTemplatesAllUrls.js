"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _got = _interopRequireDefault(require("got"));

var _hasExt = _interopRequireDefault(require("has-ext"));

var _lodash = _interopRequireDefault(require("lodash.filter"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _pMap = _interopRequireDefault(require("p-map"));

var _flattenDeep = _interopRequireDefault(require("./utilities/flattenDeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: 文件缓存获取到的模板数据
 */
const fetchMapper = async source => {
  const {
    body
  } = await (0, _got.default)(source);
  const file = await (0, _pMap.default)((0, _camelcaseKeys.default)(JSON.parse(body)), async ({
    name,
    downloadUrl
  }) => (0, _hasExt.default)(name, 'gitignore') ? downloadUrl : undefined, {
    concurrency: 8
  });
  return file;
};

const getTemplatesAllUrls = async () => (0, _lodash.default)((0, _flattenDeep.default)((await (0, _pMap.default)(['https://api.github.com/repos/github/gitignore/contents', 'https://api.github.com/repos/github/gitignore/contents/Global'], fetchMapper, {
  concurrency: 2
}))), undefined);

var _default = getTemplatesAllUrls;
exports.default = _default;
module.exports = exports.default;