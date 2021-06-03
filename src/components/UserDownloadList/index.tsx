import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useUserFiles } from "../../hooks/useUserFiles";
import { JobFile } from "../JobFile";

export const UserDownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    const { files } = useUserFiles("download");
    return (
      <>
        <div className="text-lg font-bold border-b-2 border-blue-700">
          Für Sie hinterlegte Dateien ({files.length})
        </div>

        <div className="divide-y">
          {files.map((file, i) => (
            <JobFile
              {...file}
              refresh={() => {}}
              key={`job-file${i}`}
              jobType="download"
            />
          ))}
        </div>
      </>
    );
  };
