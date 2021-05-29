import prettyBytes from "pretty-bytes";
import React, { useEffect, useState } from "react";
import { DeleteButton } from "../../adminComponents/DeleteButton";
import { hover } from "../../config/classNames";
import { useUpload } from "../../hooks/useUpload";

type TFileInfoProps = {
  file: File;
  upload: boolean;
  onDelete: (n: string, s: number) => void;
  onFinish: () => void;
  uploadType: "admin" | "customer";
};

export const DropedFileInfo: React.FunctionComponent<TFileInfoProps> = ({
  file,
  upload,
  uploadType,
  onDelete,
  onFinish,
}) => {
  const progress = useUpload(file, upload, uploadType);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress < 100 || done) {
      return;
    }
    setDone(true);
    onFinish();
  }, [progress, done, onFinish]);

  return (
    <div className={`flex p-2 ${hover}`}>
      <div className="flex-1">{file.name}</div>
      <div className="w-24">{prettyBytes(file.size)}</div>
      <div className={`w-1/4 text-right border$`}>
        <div className={`justify-end flex${upload ? " hidden" : ""}`}>
          <DeleteButton onClick={() => onDelete(file.name, file.size)} />
        </div>

        <div
          className={`bg-blue-500 whitespace-nowrap text-white text-xs p-1 text-left transition-all${
            !upload ? " hidden" : ""
          }`}
          style={{ maxWidth: `${progress}%` }}>
          {progress} %
        </div>
      </div>
    </div>
  );
};
