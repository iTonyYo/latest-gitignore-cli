import writeFileAtomic from 'write-file-atomic';

const saveFile = async (
  data,
  to,
) => {
  try {
    await writeFileAtomic(
      to,
      data,
      {},
      (error) => {
        if (error) {
          throw error;
        }
      },
    );
  } catch (error) {
    throw error;
  }
};

export default saveFile;
