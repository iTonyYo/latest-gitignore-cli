import { promisify } from 'util';
import { readFile } from 'fs';

import callsites from 'callsites';
import path from 'path';
import join from 'lodash/join';
import fg from 'fast-glob';
import pMap from 'p-map';

import save from './save';
import resolveRoot from './resolveRoot';

const fastGitignore = async (ignores, to) => {
  const tplPaths = await fg(
    [
      path.join(
        path.join(
          callsites()[0].getFileName(),
          '/../..',
        ),
        `templates/{${join(ignores, ',')}}.gitignore`,
      ),
    ],
  );

  const tplData = join(
    await pMap(tplPaths, async (filePath) => {
      const shit = await promisify(readFile)(filePath, 'utf8');
      return shit;
    }, { concurrency: 8 }),
    '\n\n\n',
  );

  await save(
    tplData,
    resolveRoot('.gitignore', to),
  );
};

export default fastGitignore;
