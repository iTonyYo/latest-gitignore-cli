import pMap from 'p-map';
import got from 'got';
import get from './utilities/get';

// batchGot(urls, {got: {}, concurrency: 8})
const batchGot = async (urls, options) => {
  const done = await pMap(
    urls,
    async (url) => get(
      await got(url, options.got),
      'body',
    ),
    { concurrency: options.concurrency },
  );

  return done;
};

export default batchGot;
