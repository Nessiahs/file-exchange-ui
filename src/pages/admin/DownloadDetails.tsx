import { RouteComponentProps, useParams } from "@reach/router";
import React, { useState } from "react";
import { JobInfo } from "../../adminComponents/JobInfo";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { DragDropUpload } from "../../components/DragDropUpload";
import { JobFile } from "../../components/JobFile";
import { useJobDetail } from "../../hooks/useJobDetail";
import { uuid } from "../../utils/uuid";

export const DownloadsDetails: React.FunctionComponent<RouteComponentProps> =
  () => {
    const { token } = useParams();

    const [viewId, setViewId] = useState(uuid());
    const { jobData, jobFiles } = useJobDetail(token, "download", viewId);

    const refresh = () => {
      const id = uuid();
      setViewId(id);
    };

    return (
      <Tile>
        <PageHeader title="Dateien für Kunden hinterlegen" />
        <JobInfo data={jobData} />
        <div>Vorhandene Dateien zum Download</div>
        <div className="divide-y">
          {jobFiles.map((file, i) => (
            <JobFile
              {...file}
              key={`uploaded-file-${i}`}
              refresh={() => refresh()}
            />
          ))}
        </div>

        <DragDropUpload uploadType="admin" refresh={() => refresh()} />
      </Tile>
    );
  };
