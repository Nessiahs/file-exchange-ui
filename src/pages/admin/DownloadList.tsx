import { RouteComponentProps } from "@reach/router";
import React from "react";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { JobList } from "../../components/JobList";

export const DownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    return (
      <Tile>
        <PageHeader title="Liste aller Downlods für Kunden" />
        <JobList jobType="download" />
      </Tile>
    );
  };
