import { RouteComponentProps } from "@reach/router";
import React from "react";
import { PageHeader } from "../../adminComponents/PageHeader";
import { JobList } from "../../components/JobList";
import { Tile } from "../../Tile";

export const DownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    return (
      <Tile>
        <PageHeader title="Liste aller Downlods für Kunden" />
        <JobList jobType="download" />
      </Tile>
    );
  };
