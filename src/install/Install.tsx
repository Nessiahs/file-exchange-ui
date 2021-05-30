import { RouteComponentProps } from "@reach/router";
import React from "react";
import { CreateUser } from "../adminComponents/CreateUser";
import { Submit } from "./Submit";

export const Install: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="mx-auto w-96 border rounded mt-10 p-2">
      <div className="text-2xl font-bold">Willkommen bei File-Exchange</div>
      <div>Zur Benutzung benötigen wir noch folgende Daten:</div>
      <CreateUser forceAdmin={true}>
        <Submit />
      </CreateUser>
    </div>
  );
};
