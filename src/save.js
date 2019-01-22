import writeFileAtomic from 'write-file-atomic';

const saveAs = async (
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

export default saveAs;
