"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _writeFileAtomic = _interopRequireDefault(require("write-file-atomic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveFile = async (data, to) => {
  await (0, _writeFileAtomic.default)(to, data, {}, error => {
    if (error) {
      throw error;
    }
  });
};

var _default = saveFile;
exports.default = _default;
module.exports = exports.default;