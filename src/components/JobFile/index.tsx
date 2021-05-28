import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import prettyBytes from "pretty-bytes";
import React, { useEffect, useState } from "react";
import { useDeleteFile } from "../../hooks/useDeleteFile";
import { useDownloadFile } from "../../hooks/useDownloadFile";
import { TFiles } from "../../hooks/useGetFilesByToken";
import { TJobType } from "../../hooks/useJobDetail";
import { FileDelete } from "./FileDelete";

type TJobFileProps = {
  refresh?: () => void;
  showDelete?: boolean;
  jobType?: TJobType;
} & TFiles;

export const JobFile: React.FunctionComponent<TJobFileProps> = ({
  id,
  filename,
  created_at,
  size,
  token,
  hashname,
  jobType,
  showDelete = true,
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
    <div className="flex p-2 hover:bg-blue-500">
      <div className="flex-grow">{filename}</div>
      <div className="w-32">
        {moment(created_at).format("DD.MM.YYYY mm:HH")}
      </div>
      <div className="w-20 text-right pr-2">{prettyBytes(size)}</div>
      <FileDelete
        onDelete={() => setDeleteId(id)}
        progress={progress}
        show={showDelete}
      />

      <div className="w-12 flex justify-center">
        <div
          className={`w-6 h-6 rounded border roundet border-green-600 text-green-600 text-center cursor-pointer hover:text-white
          hover:bg-green-600 ${downloadProgress ? " hidden" : ""}`}
          onClick={() => setForceDownload({ token, hashname, jobType })}
        >
          <FontAwesomeIcon icon={faFileDownload} />
        </div>
        <div className={downloadProgress ? "" : "hidden"}>
          {downloadProgress} %
        </div>
      </div>
    </div>
  );
};
