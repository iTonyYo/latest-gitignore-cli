"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _cacheManager = _interopRequireDefault(require("cache-manager"));

var _cacheManagerFs = _interopRequireDefault(require("cache-manager-fs"));

var _callsites = _interopRequireDefault(require("callsites"));

var _debug = _interopRequireDefault(require("debug"));

var _resolveRoot = _interopRequireDefault(require("./resolveRoot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('LG:log'); // 参见 https://git.io/fhzoI

const initFsCache = () => new Promise((resolve, reject) => {
  try {
    const workingDir = _path.default.join((0, _callsites.default)()[0].getFileName(), '../..');

    log(workingDir);

    const diskCache = _cacheManager.default.caching({
      store: _cacheManagerFs.default,
      options: {
        ttl: 60 * 2,
        maxsize: 1000 * 1000,
        path: (0, _resolveRoot.default)('.cache', workingDir),
        preventfill: false,
        fillcallback: () => {
          resolve(diskCache);
        }
      }
    });
  } catch (err) {
    reject(err);
  }
});

var _default = initFsCache;
exports.default = _default;
module.exports = exports.default;