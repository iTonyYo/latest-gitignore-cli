/**
 * TODO: 文件缓存获取到的模板数据
 */

import got from 'got';
import hasExt from 'has-ext';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import camelcaseKeys from 'camelcase-keys';
import pMap from 'p-map';

const fetchMapper = async (source) => {
  try {
    const { body } = await got(source);

    const file = await pMap(
      camelcaseKeys(JSON.parse(body)),
      async ({ name, downloadUrl }) => (
        hasExt(name, 'gitignore') ? downloadUrl : undefined
      ),
      { concurrency: 8 },
    );

    return file;
  } catch (error) {
    throw error;
  }
};

const getTemplatesAllUrls = async () => {
  try {
    return filter(
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
  } catch (error) {
    throw error;
  }
};

export default getTemplatesAllUrls;
