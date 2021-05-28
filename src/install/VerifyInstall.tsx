import { RouteComponentProps, useNavigate } from "@reach/router";
import React from "react";
import { useCheckInstall } from "../hooks/useCheckInstall";

export const VerifyInstall: React.FunctionComponent<RouteComponentProps> = ({
  children,
}) => {
  const allowed = useCheckInstall();
  const navigate = useNavigate();
  if (allowed === null) {
    return null;
  } else if (allowed === false) {
    navigate("/installation/complete/");
    return null;
  }

  return <div className="w-full">{children}</div>;
};
