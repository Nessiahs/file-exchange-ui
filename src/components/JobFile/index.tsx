import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prettyBytes from "pretty-bytes";
import React, { useEffect, useState } from "react";
import { AdminDelete } from "../../adminComponents/AdminDelete";
import { DeleteFileMessage } from "../../adminComponents/Messages/DeleteFileMessage";
import { hover } from "../../config/classNames";
import { useDeleteFile } from "../../hooks/useDeleteFile";
import { useDownloadFile } from "../../hooks/useDownloadFile";
import { TFiles, TJobType } from "../../hooks/useJobDetail";
import { getFormattedTimeByZone } from "../../utils/dateUtils";

type TJobFileProps = {
  refresh?: () => void;
  jobType?: TJobType;
} & TFiles;

export const JobFile: React.FunctionComponent<TJobFileProps> = ({
  id,
  filename,
  created,
  size,
  token,
  hashname,
  jobType,
  refresh,
}) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const progress = useDeleteFile(deleteId, "admin");
  const [forceDownload, setForceDownload] = useState<{
    token: string | null;
    hashname: string | null;
    jobType?: TJobType;
  }>({
    token: null,
    hashname: null,
    jobType,
  });
  const { progress: downloadProgress } = useDownloadFile(
    forceDownload.token,
    forceDownload.hashname,
    jobType
  );

  useEffect(() => {
    if (!downloadProgress || downloadProgress < 100) {
      return;
    }

    setForceDownload({
      token: null,
      hashname: null,
    });
  }, [downloadProgress]);

  useEffect(() => {
    if (progress === "done" && refresh) {
      refresh();
    }
  }, [progress, refresh]);

  return (
    <div className={`flex p-2 ${hover}`}>
      <div className="flex-grow">{filename}</div>
      <div className="w-32">{getFormattedTimeByZone(created)}</div>
      <div className="w-20 text-right pr-2">{prettyBytes(size)}</div>
      <AdminDelete onDelete={() => setDeleteId(id)} progress={progress}>
        <DeleteFileMessage filename={filename} />
      </AdminDelete>

      <div className="w-12 flex justify-center">
        <div
          className={`w-7 rounded border roundet border-green-600 text-green-600 text-center cursor-pointer hover:text-white
          hover:bg-green-600 ${downloadProgress ? " hidden" : ""}`}
          onClick={() => setForceDownload({ token, hashname, jobType })}>
          <FontAwesomeIcon icon={faFileDownload} />
        </div>
        <div className={downloadProgress ? "" : "hidden"}>
          {downloadProgress} %
        </div>
      </div>
    </div>
  );
};
