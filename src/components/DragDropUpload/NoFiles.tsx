type TNoFilesProps = {
  files: File[];
};

export const NoFiles: React.FunctionComponent<TNoFilesProps> = ({ files }) => {
  if (files.length) {
    return null;
  }

  return (
    <div className="text-center text-xl mt-2 font-bold">
      Noch keine Dateien für den Upload
    </div>
  );
};
