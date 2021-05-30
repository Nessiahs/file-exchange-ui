import { useLocation } from "@reach/router";
import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../config/storage";

export const useLogedin = () => {
  const [isLogedin, setLogedin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("admin")) {
      setLogedin(false);
      return;
    }

    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      return setLogedin(true);
    }
    return setLogedin(false);
  }, [location, setLogedin]);

  return isLogedin;
};
