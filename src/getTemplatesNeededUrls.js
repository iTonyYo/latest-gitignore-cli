import pMap from 'p-map';

const getTemplatesNeededUrls = async (supplies, needs) => {
  const tpls = await pMap(
    needs,
    async (ign) => supplies.find((dl) => dl.includes(`${ign}.gitignore`)),
    { concurrency: 8 },
  );

  return tpls;
};

export default getTemplatesNeededUrls;
