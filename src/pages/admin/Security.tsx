import { RouteComponentProps } from "@reach/router";
import React from "react";
import { IpRestriction } from "../../adminComponents/IpRestriction";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";

export const Security: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <>
      <Tile>
        <PageHeader title="Sicherheitseinstellungen" />
        <IpRestriction />
      </Tile>
    </>
  );
};
