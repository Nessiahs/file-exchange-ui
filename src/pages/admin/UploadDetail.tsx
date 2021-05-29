import { RouteComponentProps, useParams } from "@reach/router";
import React, { useState } from "react";
import { JobInfo } from "../../adminComponents/JobInfo";
import { PageHeader } from "../../adminComponents/PageHeader";
import { JobFile } from "../../components/JobFile";
import { useJobDetail } from "../../hooks/useJobDetail";
import { uuid } from "../../services/uuid";

export const UploadDetail: React.FunctionComponent<RouteComponentProps> =
  () => {
    const { token } = useParams();

    const [viewId, setViewId] = useState(uuid());
    const { jobData, jobFiles } = useJobDetail(token, "upload", viewId);
    return (
      <>
        <PageHeader title="Kunden Upload details" />
        <JobInfo data={jobData} />
        <div>Vom Kunden hochgeladene Dateien:</div>
        <div className="divide-y">
          {jobFiles.map((file, i) => (
            <JobFile
              {...file}
              key={`uploaded-file-${i}`}
              refresh={() => setViewId(uuid())}
            />
          ))}
        </div>
      </>
    );
  };
