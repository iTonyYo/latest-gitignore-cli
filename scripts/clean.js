import execa from 'execa';
import { resolveApp } from './paths';

(async () => {
  const scriptsDir = resolveApp('scripts');

  const cleanReports = execa('npx', [
    'babel-node',
    `${scriptsDir}/clean-reports.js`,
  ]);

  const cleanCache = execa('npx', [
    'babel-node',
    `${scriptsDir}/clean-cache.js`,
  ]);

  const cleanBuilt = execa('npx', [
    'babel-node',
    `${scriptsDir}/clean-built.js`,
  ]);

  await cleanReports;
  await cleanCache;
  await cleanBuilt;
})();
