import axios from "axios";
import { useEffect, useState } from "react";

export type TIsAdmin = 0 | 1;

type TLoginState = {
  isLoggedIn: boolean;
  isAdmin: TIsAdmin;
  id: number;
};

const isAdminValid = (value: any): value is TIsAdmin => {
  return [0, 1].includes(value);
};

export const useIsLoggedIn = (path: string, renderId = "") => {
  const [state, setState] = useState<TLoginState>({
    isLoggedIn: false,
    isAdmin: 0,
    id: -1,
  });
  useEffect(() => {
    const req = async () => {
      try {
        const response = await axios.get("/admin/status/");
        const { isAdmin, id } = response.data;
        if (typeof id !== "number" || !isAdminValid(isAdmin)) {
          throw new Error();
        }
        setState({
          isLoggedIn: true,
          isAdmin,
          id,
        });
      } catch (e) {
        setState({
          isLoggedIn: false,
          isAdmin: 0,
          id: -1,
        });
      }
    };
    req();
  }, [path, renderId, setState]);

  return state;
};
