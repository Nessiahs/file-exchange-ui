import { RouteComponentProps, useParams } from "@reach/router";
import React, { useState } from "react";
import { DragDropUpload } from "../../components/DragDropUpload";
import { JobFile } from "../../components/JobFile";
import { JobInfo } from "../../components/JobInfo";
import { PageHeader } from "../../components/PageHeader";
import { useJobDetail } from "../../hooks/useJobDetail";
import { uuid } from "../../services/uuid";

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
      <>
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
      </>
    );
  };
