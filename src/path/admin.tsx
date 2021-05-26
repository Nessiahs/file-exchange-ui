import { RouteComponentProps, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Login } from "../components/Login";
import { Navigation } from "../components/Navigation";
import { useIsLogedIn } from "../hooks/useIsLogedIn";

export const Admin: React.FunctionComponent<RouteComponentProps> = ({
  children,
}) => {
  const location = useLocation();
  const isLogedIn = useIsLogedIn(location.pathname);
  const [hideLogin, setHide] = useState<boolean | null>(null);

  useEffect(() => {
    setHide(isLogedIn);
  }, [isLogedIn, setHide]);

  if (hideLogin === null) {
    return null;
  }

  if (!hideLogin) {
    return <Login hideLogin={(l: boolean) => setHide(l)} />;
  }

  return (
    <div className="flex flex-1 p-1 container mx-auto">
      <div className=" h-full w-48 divide-y">
        <Navigation />
      </div>
      <div className="overflow-y-auto flex-1 p-2">{children}</div>
    </div>
  );
};
