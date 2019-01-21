import { realpathSync } from 'fs';
import { resolve } from 'path';

const appDirectory = realpathSync(process.cwd());
const resolveApp   = relativePath => resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  resolveApp
};
