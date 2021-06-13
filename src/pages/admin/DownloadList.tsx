import { navigate, RouteComponentProps } from "@reach/router";
import React from "react";
import { AddButton } from "../../adminComponents/AddButton";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { JobList } from "../../components/JobList";
import { ROUTE_ADMIN_CREATE, ROUTE_ADMIN_HOME } from "../../config/routes";

export const DownloadList: React.FunctionComponent<RouteComponentProps> =
  () => {
    return (
      <Tile>
        <PageHeader title="Gesendete Dateien">
          <AddButton
            onClick={() => {
              navigate(`/${ROUTE_ADMIN_HOME}/${ROUTE_ADMIN_CREATE}/download/`);
            }}
            text="Dateien versenden"
          />
        </PageHeader>
        <JobList jobType="download" className="mt-2" />
      </Tile>
    );
  };
