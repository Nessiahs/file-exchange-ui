import { RouteComponentProps, useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Login } from "../adminComponents/Login";
import { Navigation } from "../adminComponents/Navigation";
import { useIsLoggedIn } from "../hooks/useIsLogedIn";
import { uuid } from "../utils/uuid";

type TAdminContext = {
  isAdmin: 0 | 1;
  userId: number;
  responseUser: number;
  setResponseUser: (id: number) => void;
};

export const AdminContext = React.createContext<Partial<TAdminContext>>({});

export const Admin: React.FunctionComponent<RouteComponentProps> = ({
  children,
}) => {
  const location = useLocation();
  const [renderId, setRenderId] = useState(uuid());
  const { isLoggedIn, isAdmin, id } = useIsLoggedIn(
    location.pathname,
    renderId
  );
  const [hideLogin, setHide] = useState<boolean | null>(null);
  const [responseUser, setResponseUser] = useState(-1);

  useEffect(() => {
    setHide(isLoggedIn);
  }, [isLoggedIn, setHide]);

  if (hideLogin === null) {
    return null;
  }

  if (!hideLogin) {
    return (
      <Login
        hideLogin={(l: boolean) => {
          setRenderId(uuid());
          setHide(l);
        }}
      />
    );
  }

  return (
    <AdminContext.Provider
      value={{ isAdmin, userId: id, responseUser, setResponseUser }}>
      <div className="flex flex-1 p-1 container mx-auto h-full">
        <div className="w-48 divide-y pt-2">
          <Navigation isAdmin={isAdmin} />
        </div>
        <div className="overflow-y-auto flex-1 p-2 h-full">{children}</div>
      </div>
    </AdminContext.Provider>
  );
};
