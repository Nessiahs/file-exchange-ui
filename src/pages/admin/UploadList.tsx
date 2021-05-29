import { RouteComponentProps } from "@reach/router";
import React from "react";
import { PageHeader } from "../../adminComponents/PageHeader";
import { JobList } from "../../components/JobList";

export const UploadList: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <>
      <PageHeader title="Liste aller Uploads von Kunden" />
      <JobList jobType="upload" />
    </>
  );
};
