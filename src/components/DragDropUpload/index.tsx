import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DropedFileInfo } from "./DropedFileInfo";
import { NoFiles } from "./NoFiles";
import { useDragDropUploadComponent } from "./useDragDropUploadComponent";

type TDropAreaProps = {
  uploadType?: "admin" | "customer";
  refresh?: () => void;
};

export const DragDropUpload: React.FunctionComponent<TDropAreaProps> = ({
  uploadType = "customer",
  refresh,
}) => {
  const {
    opacity,
    events,
    upload,
    uploadFiles,
    onDelete,
    onFinsihUpload,
    setUpload,
  } = useDragDropUploadComponent(refresh);
  return (
    <>
      <div
        {...events}
        className={`w-full border-gray-700 border-dashed border-2 rounded h-48 border-opacity-${opacity}`}>
        <div
          className={`text-center text-xl mt-14 font-bold opacity-${opacity}`}>
          {upload ? "Dateien werden hochgeladen" : "Dateien hier ablegen"}
        </div>
      </div>
      <NoFiles files={uploadFiles} />
      <div className="divide-y">
        {uploadFiles.map((file, i) => (
          <DropedFileInfo
            uploadType={uploadType}
            key={`drop-file-${i}`}
            file={file}
            upload={upload}
            onDelete={(n: string, s: number) => {
              onDelete(n, s);
            }}
            onFinish={() => onFinsihUpload()}
          />
        ))}
      </div>
      <div className="w-full justify-end flex">
        <div
          className={`flex ml-auto hover:bg-green-700 hover:text-white text-green-700 border-green-700 border rounded px-1 pt-1 ${
            uploadFiles.length
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={() => {
            if (uploadFiles.length && !upload) {
              setUpload(true);
            }
          }}>
          <div className="w-8 h-8 text-center mr-2">
            <FontAwesomeIcon icon={faUpload} />
          </div>
          Upload
        </div>
      </div>
    </>
  );
};
