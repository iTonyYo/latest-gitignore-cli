import Listr from 'listr';
import execa from 'execa';
import { resolveCwd } from './paths';

const scriptsDir = resolveCwd('scripts');

const tasks = new Listr([
  {
    title: '清理日志、报告等',
    task: () => execa('npx', [
      'babel-node',
      `${scriptsDir}/clean-reports.js`,
    ])
  },

  {
    title: '清理缓存',
    task: () => execa('npx', [
      'babel-node',
      `${scriptsDir}/clean-cache.js`,
    ])
  },

  {
    title: '清理包',
    task: () => execa('npx', [
      'babel-node',
      `${scriptsDir}/clean-packages.js`,
    ])
  },

  {
    title: '安装包',
    task: () => execa('yarn', [
      'install'
    ])
  },

  {
    title: '生成包的证书报告',
    task: () => execa('yarn', [
      'license'
    ])
  },
]);

tasks.run().catch((err) => {
  throw err;
});
