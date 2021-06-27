import { RouteComponentProps } from "@reach/router";
import React from "react";
import { IpRestriction } from "../../adminComponents/IpRestriction";
import { PageHeader } from "../../adminComponents/PageHeader";
import { SmtpSettings } from "../../adminComponents/SmtpSettings";
import { Tile } from "../../adminComponents/Tile";

export const Security: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <>
      <Tile>
        <PageHeader title="Servereinstellungen" />
        <IpRestriction />
        <SmtpSettings />
      </Tile>
    </>
  );
};
