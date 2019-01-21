import pMap from 'p-map';
import got from 'got';
import get from 'lodash/get';

// batchGot(urls, {got: {}, concurrency: 8})
const batchGot = async (urls, options) => {
  try {
    return await pMap(
      urls,
      async url => get(
        await got(url, options.got),
        'body',
      ),
      { concurrency: options.concurrency },
    );
  } catch (err) {
    throw err;
  }
};

export default batchGot;
