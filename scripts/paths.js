import { realpathSync } from 'fs';
import { resolve } from 'path';

const appDirectory = realpathSync(process.cwd());
const resolveCwd   = relativePath => resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  resolveCwd,
  docs: resolveCwd('doc'),
  srcRollupEntryPath: resolveCwd('src/index.js'),
};
