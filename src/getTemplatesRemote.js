import join from 'lodash/join';
import batchGot from './batchGot';

const getTemplatesRemote = async (urls) => {
  try {
    return join(
      await batchGot(
        urls,
        { concurrency: 8 },
      ),
      '\n\n\n',
    );
  } catch (error) {
    throw error;
  }
};

export default getTemplatesRemote;
