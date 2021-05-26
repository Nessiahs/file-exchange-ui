import { RouteComponentProps } from "@reach/router";
import React from "react";
import { JobList } from "../../components/JobList";
import { PageHeader } from "../../components/PageHeader";

export const DownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    return (
      <>
        <PageHeader title="Liste aller Downlods für Kunden" />
        <JobList jobType="download" />
      </>
    );
  };
