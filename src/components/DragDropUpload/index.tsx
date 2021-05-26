import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { DropedFileInfo } from "./DropedFileInfo";
import { NoFiles } from "./NoFiles";

const defaultClassName = "border-opacity-20 ";

type TDropAreaProps = {
  uploadType?: "admin" | "customer";
  refresh?: () => void;
};

export const DragDropUpload: React.FunctionComponent<TDropAreaProps> = ({
  uploadType = "customer",
  refresh,
}) => {
  const [className, setClassName] = useState(defaultClassName);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [finished, setFinished] = useState(0);
  const [upload, setUpload] = useState(false);

  const addFiles = (f: FileList) => {
    const list = [...uploadFiles];
    for (let i = 0; i < f.length; i++) {
      if (
        uploadFiles.find((p) => p.name === f[i].name && p.size === f[i].size)
      ) {
        continue;
      }
      list.push(f[i]);
    }
    setUploadFiles(list);
  };

  const onDelete = (name: string, size: number) => {
    const list = uploadFiles.filter(
      (file) => file.name !== name && file.size !== size
    );
    setUploadFiles(list);
  };

  const onFinsihUpload = () => {
    if (finished + 1 < uploadFiles.length) {
      setFinished(finished + 1);
    } else {
      setFinished(0);
      setUploadFiles([]);
      setUpload(false);
      if (refresh) {
        window.setTimeout(() => {
          refresh();
        }, 300);
      }
    }
  };

  return (
    <>
      <div
        onDragEnter={(e) => {
          if (upload) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          setClassName("border-opacity-80");
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          if (upload) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          setClassName(defaultClassName);
          addFiles(e.dataTransfer.files);
          e.dataTransfer.clearData();
        }}
        onDragLeave={(e) => {
          if (upload) {
            return;
          }
          e.stopPropagation();
          e.preventDefault();
          setClassName(defaultClassName);
        }}
        className={`w-full border-gray-700 border-dashed border-2 rounded h-48 ${className}`}>
        <div className="text-center text-xl mt-14 font-bold">
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
