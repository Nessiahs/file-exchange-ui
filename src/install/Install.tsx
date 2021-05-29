import { RouteComponentProps } from "@reach/router";
import React from "react";
import { CreateUser } from "../adminComponents/CreateUser";
import { Submit } from "./Submit";

export const Install: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="w-96 border rounded mt-14 p-2 mx-auto">
      <div>
        <div className="font-bold text-xl mb-2">
          Wilkommen bei File-Exchange
        </div>
        Bevor es benutzt werden kann, werden noch folgende Information benötigt:
      </div>
      <CreateUser forceAdmin={true}>
        <Submit />
      </CreateUser>
    </div>
  );
};
