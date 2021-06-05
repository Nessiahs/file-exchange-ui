import { RouteComponentProps } from "@reach/router";
import React from "react";
import { useUserFiles } from "../../hooks/useUserFiles";
import { JobFile } from "../JobFile";

export const UserDownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    const { files } = useUserFiles("download");
    return (
      <div className="container mx-auto">
        <div className="text-lg font-bold border-b-2 border-blue-700">
          Für Sie hinterlegte Dateien ({files.length})
        </div>

        <div className="divide-y">
          <div className="flex font-bold">
            <div className="flex-grow p-1"> Name</div>
            <div className="w-32">Hochgeladen</div>
            <div className="w-20 text-center pr-2">Größe</div>
            <div className="w-12">&nbsp;</div>
          </div>
          {files.map((file, i) => (
            <JobFile
              {...file}
              refresh={() => {}}
              key={`job-file${i}`}
              jobType="download"
            />
          ))}
        </div>
      </div>
    );
  };
