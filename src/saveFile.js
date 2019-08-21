import writeFileAtomic from 'write-file-atomic';

const saveFile = async (
  data,
  to,
) => {
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
};

export default saveFile;
