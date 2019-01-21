import trash from 'trash';
import { resolveApp } from './paths';

trash([
  resolveApp('yarn-error.log'),
  resolveApp('.nyc_output'),
  resolveApp('coverage'),
  resolveApp('licenses-development.csv '),
  resolveApp('licenses-production.csv'),
]);
