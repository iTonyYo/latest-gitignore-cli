#!/usr/bin/env node

import meow from 'meow';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import redent from 'redent';
import { cosmiconfigSync } from 'cosmiconfig';
import debug from 'debug';

import isEmpty from './utilities/isEmpty';
import pkg from '../package.json';
import get from './utilities/get';
import getWorkingDirectory from './getWorkingDirectory';
import latestGitignore from './latestGitignore';

class Cli {
  constructor() {
    updateNotifier({ pkg }).notify();

    this.cli = meow(`
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
          alias: 'o',
        },
        help: {
          type: 'boolean',
          alias: 'h',
        },
        version: {
          type: 'boolean',
          alias: 'V',
        },
      },
    });

    this.workingPath = getWorkingDirectory(this.cli.input[0]).twd;
    this.userDefinedConfig = this.getUserDefinedConfig();
    this.log = debug('LG:log');
  }

  async run() {
    if (isEmpty(this.userDefinedConfig)) {
      console.log(redent(chalk`
        {red.bold 检测到您未提供所需模板，\`latest-gitignore\` 不得不中止。}
        {grey 建议运行 \`latest-gitignore --help\` 来获取使用帮助。}
      `, 2));

      return;
    }

    this.log('您已声明所需模板');

    const rslt = await latestGitignore({
      needs: this.getSelectedTemplatesByName(),
      to: this.getDest(),
    });

    console.log(redent(chalk`
      {green.bold ${rslt.message}}
      {grey ${rslt.out}}
    `, 2));
  }

  getSelectedTemplatesByName() {
    const { input } = this.cli;

    if (isEmpty(input)) {
      return this.userDefinedConfig;
    }

    return input;
  }

  getDest() {
    const { flags } = this.cli;
    const { out } = flags;

    if (isEmpty(out)) {
      return this.workingPath;
    }

    return out;
  }

  getUserDefinedConfig() {
    const explorerSync = cosmiconfigSync('gitignore');
    const foundConfig = explorerSync.search(this.workingPath);

    return isEmpty(foundConfig) ? {} : get(foundConfig, 'config');
  }
}

export default Cli;
