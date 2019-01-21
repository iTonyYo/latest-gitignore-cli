import trash from 'trash';
import { resolveApp } from './paths';

trash([
  resolveApp('esm'),
]);
