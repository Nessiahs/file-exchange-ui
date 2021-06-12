import { RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { ROUTE_ADMIN_HOME } from "../../config/routes";

export const Logout: React.FunctionComponent<RouteComponentProps> = () => {
  const navigate = useNavigate();
  sessionStorage.clear();

  navigate(`/${ROUTE_ADMIN_HOME}/`);

  return null;
};
