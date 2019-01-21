import { realpathSync } from 'fs';
import { resolve } from 'path';

const resolveRoot = (relativePath, base) => resolve(
  realpathSync(base),
  relativePath,
);

export default resolveRoot;
