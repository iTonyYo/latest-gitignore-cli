import trash from 'trash';
import { resolveCwd } from './paths';

trash([
  resolveCwd('yarn-error.log'),
  resolveCwd('.nyc_output'),
  resolveCwd('coverage'),
  resolveCwd('licenses-development.csv '),
  resolveCwd('licenses-production.csv'),
  resolveCwd('doc/licenses-development.csv '),
  resolveCwd('doc/licenses-production.csv'),
]);
