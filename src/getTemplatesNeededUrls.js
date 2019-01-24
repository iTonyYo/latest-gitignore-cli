import pMap from 'p-map';
import find from 'lodash/find';
import includes from 'lodash/includes';

const getTemplatesNeededUrls = async (supplies, needs) => {
  try {
    return await pMap(
      needs,
      async ign => find(
        supplies,
        dl => includes(dl, `${ign}.gitignore`),
      ),
      { concurrency: 8 },
    );
  } catch (err) {
    throw err;
  }
};

export default getTemplatesNeededUrls;
