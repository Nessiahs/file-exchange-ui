import { RouteComponentProps } from "@reach/router";
import React from "react";
import { PageHeader } from "../../adminComponents/PageHeader";
import { JobList } from "../../components/JobList";

export const DownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    return (
      <>
        <PageHeader title="Liste aller Downlods für Kunden" />
        <JobList jobType="download" />
      </>
    );
  };
