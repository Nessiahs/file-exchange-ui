import { RouteComponentProps } from "@reach/router";
import React from "react";
import { PageHeader } from "../../adminComponents/PageHeader";
import { JobList } from "../../components/JobList";
import { Tile } from "../../Tile";

export const UploadList: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <Tile>
      <PageHeader title="Liste aller Uploads von Kunden" />
      <JobList jobType="upload" />
    </Tile>
  );
};
