import path from 'path';

import cacheManager from 'cache-manager';
import fsStore from 'cache-manager-fs';
import callsites from 'callsites';

import resolveRoot from './resolveRoot';

// 参见 https://git.io/fhzoI
const initFsCache = () => new Promise((resolve, reject) => {
  try {
    const diskCache = cacheManager.caching({
      store: fsStore,
      options: {
        ttl: 60 * 2,
        maxsize: 1000 * 1000,
        path: resolveRoot(
          '.cache',
          path.join(
            callsites()[0].getFileName(),
            '../..',
          ),
        ),
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
