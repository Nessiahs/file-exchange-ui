import React, { useState } from "react";

const outOpacity = 20;
const overOpacity = 80;
const refreshTime = 800;

export const useDragDropUploadComponent = (refresh?: () => void) => {
  const [opacity, setOpacity] = useState(outOpacity);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [finished, setFinished] = useState(0);
  const [upload, setUpload] = useState(false);

  const addFiles = (f: FileList) => {
    const list = [...uploadFiles];
    const files = Array.from(f);

    for (const file of files) {
      if (
        uploadFiles.find((p) => p.name === file.name && p.size === file.size)
      ) {
        continue;
      }
      list.push(file);
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
        }, refreshTime);
      }
    }
  };

  const events = {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      if (upload) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setOpacity(overOpacity);
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      if (upload) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      setOpacity(outOpacity);
      addFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      if (upload) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      setOpacity(outOpacity);
    },
  };

  return {
    opacity,
    events,
    upload,
    uploadFiles,
    onDelete,
    onFinsihUpload,
    setUpload,
  };
};
