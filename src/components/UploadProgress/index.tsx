export type TProgress = {
  filename: string;
  progress: number;
  size: number;
  done: boolean;
};

type TUploadProgressProps = {
  progress: TProgress[];
};

export const UploadProgress: React.FunctionComponent<TUploadProgressProps> = ({
  progress,
}) => {
  if (!progress.length) {
    return null;
  }

  return (
    <div>
      {progress.map((file, i) => (
        <div
          className="flex border-blue-500 border-b p-2"
          key={`file-${i}-${file.size}`}>
          <div className="flex-1">{file.filename}</div>
          <div>
            <div
              className="bg-blue-500"
              style={{ width: `${file.progress}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
