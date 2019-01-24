import path from 'path';

import cacheManager from 'cache-manager';
import fsStore from 'cache-manager-fs';
import callsites from 'callsites';
import debug from 'debug';

import resolveRoot from './resolveRoot';

const log = debug('LG:log');

// 参见 https://git.io/fhzoI
const initFsCache = () => new Promise((resolve, reject) => {
  try {
    const workingDir = path.join(
      callsites()[0].getFileName(),
      '../..',
    );

    log(workingDir);

    const diskCache = cacheManager.caching({
      store: fsStore,
      options: {
        ttl: 60 * 2,
        maxsize: 1000 * 1000,
        path: resolveRoot('.cache', workingDir),
        preventfill: false,
        fillcallback: () => {
          resolve(diskCache);
        },
      },
    });
  } catch (err) {
    reject(err);
  }
});

export default initFsCache;
