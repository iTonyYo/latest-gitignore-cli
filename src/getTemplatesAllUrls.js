/**
 * TODO: 文件缓存获取到的模板数据
 */

import got from 'got';
import hasExt from 'has-ext';
import filter from 'lodash.filter';
import camelcaseKeys from 'camelcase-keys';
import pMap from 'p-map';

import flattenDeep from './utilities/flattenDeep';

const fetchMapper = async (source) => {
  const { body } = await got(source);

  const file = await pMap(
    camelcaseKeys(JSON.parse(body)),
    async ({ name, downloadUrl }) => (
      hasExt(name, 'gitignore') ? downloadUrl : undefined
    ),
    { concurrency: 8 },
  );

  return file;
};

const getTemplatesAllUrls = async () => filter(
  flattenDeep(
    await pMap(
      [
        'https://api.github.com/repos/github/gitignore/contents',
        'https://api.github.com/repos/github/gitignore/contents/Global',
      ],
      fetchMapper,
      { concurrency: 2 },
    ),
  ),
  undefined,
);

export default getTemplatesAllUrls;
