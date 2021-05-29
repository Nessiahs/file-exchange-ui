import axios from "axios";
import { useEffect, useState } from "react";

export const useCreateUser = (
  email: string,
  password: string,
  isAdmin: 0 | 1
) => {
  const [state, setState] = useState<{
    progress: boolean;
    success: boolean | null;
  }>({
    progress: false,
    success: null,
  });
  useEffect(() => {
    if (!email || !password) {
      return;
    }

    setState({ progress: true, success: null });
    const fetch = async () => {
      try {
        await axios.post("/admin/add-user/", {
          email,
          password,
          isAdmin,
        });
        setState({ progress: false, success: true });
      } catch (error) {
        setState({ progress: false, success: false });
      }
    };
    fetch();
  }, [email, password, isAdmin, setState]);

  return state;
};
