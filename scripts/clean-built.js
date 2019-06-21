import trash from 'trash';
import { resolveCwd } from './paths';

trash([
  resolveCwd('esm'),
]);
