import { RouteComponentProps, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Login } from "../components/Login";
import { Navigation } from "../components/Navigation";
import { useIsLogedIn } from "../hooks/useIsLogedIn";

export const Admin: React.FunctionComponent<RouteComponentProps> = ({
  children,
}) => {
  const location = useLocation();
  const { isLogedIn, forceAdmin } = useIsLogedIn(location.pathname);
  const [hideLogin, setHide] = useState<boolean | null>(null);
  const [isAdmin, setAdmin] = useState<0 | 1>(0);

  useEffect(() => {
    setHide(isLogedIn);
  }, [isLogedIn, setHide]);

  useEffect(() => {
    setAdmin(forceAdmin);
  }, [forceAdmin, setAdmin]);

  if (hideLogin === null) {
    return null;
  }

  if (!hideLogin) {
    return (
      <Login
        hideLogin={(l: boolean) => setHide(l)}
        setAdmin={(state) => {
          setAdmin(state);
        }}
      />
    );
  }

  return (
    <div className="flex flex-1 p-1 container mx-auto">
      <div className=" h-full w-48 divide-y">
        <Navigation isAdmin={isAdmin} />
      </div>
      <div className="overflow-y-auto flex-1 p-2">{children}</div>
    </div>
  );
};
