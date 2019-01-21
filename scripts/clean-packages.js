import trash from 'trash';
import { resolveApp } from './paths';

trash([
  resolveApp('yarn.lock'),
  resolveApp('package-lock.json'),

  resolveApp('node_modules'),
])
