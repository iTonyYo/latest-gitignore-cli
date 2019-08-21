#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _chalk = _interopRequireDefault(require("chalk"));

var _redent = _interopRequireDefault(require("redent"));

var _cosmiconfig = _interopRequireDefault(require("cosmiconfig"));

var _isEmpty = _interopRequireDefault(require("./utilities/isEmpty"));

var _package = _interopRequireDefault(require("../package.json"));

var _get = _interopRequireDefault(require("./utilities/get"));

var _getWorkingDirectory = _interopRequireDefault(require("./getWorkingDirectory"));

var _latestGitignore = _interopRequireDefault(require("./latestGitignore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cli {
  constructor() {
    (0, _updateNotifier.default)({
      pkg: _package.default
    }).notify();
    this.cli = (0, _meow.default)(`
      使用方式
        $ latest-gitignore <主题> <...> 选项 [...]

      选项
        --out, -o,                                       '.gitignore' 文件存储位置，默认：'process.cwd()'
        --version, -V,                                   查看版本号
        --help, -h                                       查看帮助

      示例
        $ latest-gitignore macOS Windows Linux Node -o . 在命令行中指定需要忽略的文件
        $ latest-gitignore -o .                          已在配置中指定需要忽略的文件
    `, {
      flags: {
        out: {
          type: 'string',
          alias: 'o'
        },
        help: {
          type: 'boolean',
          alias: 'h'
        },
        version: {
          type: 'boolean',
          alias: 'V'
        }
      }
    });
    this.workingPath = (0, _getWorkingDirectory.default)(this.cli.input[0]).twd;
    this.userDefinedConfig = this.getUserDefinedConfig();
  }

  async run() {
    const rslt = await (0, _latestGitignore.default)(this.getSelectedTemplatesByName(), this.getDest());
    console.log((0, _redent.default)(_chalk.default`
      {green.bold ${rslt.message}}
      {grey ${rslt.out}}
    `, 2));
  } // 待办： 是否提示 "必须提供需要被 Git 忽略的内容主题"


  getSelectedTemplatesByName() {
    const {
      input
    } = this.cli;

    if ((0, _isEmpty.default)(input)) {
      return this.userDefinedConfig;
    }

    return input;
  }

  getDest() {
    const {
      flags
    } = this.cli;
    const {
      out
    } = flags;

    if ((0, _isEmpty.default)(out)) {
      return this.workingPath;
    }

    return out;
  }

  getUserDefinedConfig() {
    const explorer = (0, _cosmiconfig.default)('gitignore');
    const foundConfig = explorer.searchSync(this.workingPath);
    return (0, _isEmpty.default)(foundConfig) ? {} : (0, _get.default)(foundConfig, 'config');
  }

}

var _default = Cli;
exports.default = _default;
module.exports = exports.default;