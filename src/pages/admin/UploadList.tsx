import { RouteComponentProps } from "@reach/router";
import React from "react";
import { JobList } from "../../components/JobList";
import { PageHeader } from "../../components/PageHeader";

export const UploadList: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <>
      <PageHeader title="Liste aller Uploads von Kunden" />
      <JobList jobType="upload" />
    </>
  );
};
