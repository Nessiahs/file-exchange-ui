import { RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { AddButton } from "../../adminComponents/AddButton";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { JobList } from "../../components/JobList";
import { ROUTE_ADMIN_CREATE, ROUTE_ADMIN_HOME } from "../../config/routes";

export const UploadList: React.FunctionComponent<RouteComponentProps> = () => {
  const navigate = useNavigate();
  return (
    <Tile>
      <PageHeader title="Empfangene Dateien">
        <AddButton
          onClick={() => {
            navigate(`/${ROUTE_ADMIN_HOME}/${ROUTE_ADMIN_CREATE}/upload/`);
          }}
          text="Dateien empfangen"
        />
      </PageHeader>
      <JobList jobType="upload" className="mt-2" />
    </Tile>
  );
};
