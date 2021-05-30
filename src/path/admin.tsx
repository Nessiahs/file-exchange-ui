import { RouteComponentProps, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Navigation } from "../adminComponents/Navigation";
import { Login } from "../components/Login";
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
    <div className="flex flex-1 p-1 container mx-auto h-full">
      <div className="w-48 divide-y pt-2">
        <Navigation isAdmin={isAdmin} />
      </div>
      <div className="overflow-y-auto flex-1 p-2 h-full">{children}</div>
    </div>
  );
};
