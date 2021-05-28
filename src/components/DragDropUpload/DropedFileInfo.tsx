import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prettyBytes from "pretty-bytes";
import React, { useEffect, useState } from "react";
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
    <div className="flex p-2">
      <div className="flex-1">{file.name}</div>
      <div className="w-24">{prettyBytes(file.size)}</div>
      <div className={`w-1/4 text-right border$`}>
        <div
          className={`w-8 ml-auto text-center cursor-pointer hover:bg-gray-800 hover:text-white border rounded ${
            upload ? "hidden" : ""
          }`}
          onClick={() => onDelete(file.name, file.size)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>

        <div
          className={`bg-blue-500 whitespace-nowrap text-white text-xs p-1 text-left transition-all${
            !upload ? " hidden" : ""
          }`}
          style={{ maxWidth: `${progress}%` }}
        >
          {progress} %
        </div>
      </div>
    </div>
  );
};
