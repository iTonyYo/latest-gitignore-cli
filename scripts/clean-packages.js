import trash from 'trash';
import { resolveCwd } from './paths';

trash([
  resolveCwd('yarn.lock'),
  resolveCwd('package-lock.json'),

  resolveCwd('node_modules'),
])
