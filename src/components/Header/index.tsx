import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Logout } from "./Logout";

export const Header: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="container mx-auto text-white p-1 flex justify-between">
      <div>File-Exchange</div>
      <div>
        <Logout />
      </div>
    </div>
  );
};
