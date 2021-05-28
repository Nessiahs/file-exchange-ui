import axios from "axios";
import { useEffect, useState } from "react";
export const useIsLogedIn = (path: string) => {
  const [isLogedIn, setLogedIn] = useState<null | boolean>(null);
  const [forceAdmin, setForceAdmin] = useState<0 | 1>(0);
  useEffect(() => {
    const req = async () => {
      try {
        const response = await axios.get("/admin/status/");
        setForceAdmin(response.data.isAdmin);
        setLogedIn(true);
      } catch (e) {
        setLogedIn(false);
      }
    };
    req();
  }, [path, setLogedIn]);

  return { isLogedIn, forceAdmin };
};
