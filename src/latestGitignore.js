import { promisify } from 'util';

import join from 'lodash/join';
import writeFileAtomic from 'write-file-atomic';
import isNil from 'lodash/isNil';
import includes from 'lodash/includes';
import find from 'lodash/find';
import pMap from 'p-map';

import getAllDownloadUrls from './getAllDownloadUrls';
import batchGot from './batchGot';
import resolveRoot from './resolveRoot';
import initFsCache from './initFsCache';

const getUrls = async (allUrls, ignores) => {
  try {
    return await pMap(
      ignores,
      async ign => find(
        allUrls,
        dl => includes(dl, `${ign}.gitignore`),
      ),
      { concurrency: 8 },
    );
  } catch (err) {
    throw err;
  }
};

const latestGitignore = async (ignores, to) => {
  const diskCache = await initFsCache();
  const pCacheGet = promisify(diskCache.get);
  const pCacheSet = promisify(diskCache.set);

  const cache = await pCacheGet('allDownloadUrls');

  if (isNil(cache)) {
    const allDownloadUrls = await getAllDownloadUrls();

    const sc = pCacheSet('allDownloadUrls', allDownloadUrls);
    const wf = writeFileAtomic(
      resolveRoot('.gitignore', to),
      join(
        await batchGot(
          await getUrls(allDownloadUrls, ignores),
          { concurrency: 8 },
        ),
        '\n\n\n',
      ),
      {},
      (err) => {
        if (err) {
          throw err;
        }
      },
    );

    await sc;
    await wf;
  }

  if (!isNil(cache)) {
    const allDownloadUrls = await pCacheGet('allDownloadUrls');
    await writeFileAtomic(
      resolveRoot('.gitignore', to),
      join(
        await batchGot(
          await getUrls(allDownloadUrls, ignores),
          { concurrency: 8 },
        ),
        '\n\n\n',
      ),
      {},
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
  }
};

export default latestGitignore;
