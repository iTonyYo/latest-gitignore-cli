import batchGot from './batchGot';

const getTemplatesRemote = async (urls) => {
  const batched = await batchGot(
    urls,
    { concurrency: 8 },
  );

  return batched.join('\n\n\n');
};

export default getTemplatesRemote;
