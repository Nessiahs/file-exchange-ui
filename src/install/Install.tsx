import { RouteComponentProps } from "@reach/router";
import React from "react";
import { CreateUser } from "../adminComponents/CreateUser";
import { Submit } from "./Submit";

export const Install: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <CreateUser forceAdmin={true}>
      <Submit />
    </CreateUser>
  );
};
