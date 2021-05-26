import axios from "axios";
import { useEffect, useState } from "react";
export const useIsLogedIn = (path: string) => {
  const [isLogedIn, setLogedIn] = useState<null | boolean>(null);

  useEffect(() => {
    const req = async () => {
      try {
        await axios.get("/admin/status/");

        setLogedIn(true);
      } catch (e) {
        setLogedIn(false);
      }
    };
    req();
  }, [path, setLogedIn]);

  return isLogedIn;
};
