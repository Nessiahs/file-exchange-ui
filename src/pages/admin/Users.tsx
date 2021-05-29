import { RouteComponentProps } from "@reach/router";
import React from "react";
import { UserList } from "../../adminComponents/UserList";

export const Users: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div>
      <div>Benutzer Admin-Interface</div>

      <UserList />
    </div>
  );
};
