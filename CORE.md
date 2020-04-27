# `latestGitignore(needs, to)`

- `needs` {Array | String} 需被 Git 忽略的内容的主题
- `to` {String} `.gitignore` 文件存储位置
- 返回: {Object}
  - `out` {String} 生成后的 `.gitignore` 所在位置
  - `message` {String} 生成结果简述

## 目录

- [安装](#安装)
- [使用](#使用)

## 安装

```shell
# 使用 NPM
$ npm i latest-gitignore

# 使用 Yarn
$ yarn add latest-gitignore
```

## 使用

```javascript
import latestGitignore from 'latest-gitignore';

(async () => {
  console.log(await latestGitignore(
    [
      'macOS',
      'Windows',
      'Linux',
      'Node',
      'VisualStudioCode',
      'SublimeText',
      'CVS',
      'Diff',
      'Vim',
      'TortoiseGit',
    ],
    '.',
  ));

  /**
   * 输出:
   *
   * {
   *   out: '/Users/username/git-project',
   *   message: '成功添加 `.gitignore` 文件'
   * }
   */
})();
```