import axios from "axios";
import { useEffect, useState } from "react";

export type TCredentials = {
  email: string | null;
  password: string | null;
};

export const useLogin = (credentials: TCredentials) => {
  const [isValid, setValid] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(false);
  const [isAdmin, setAdmin] = useState<0 | 1>(0);
  const { email, password } = credentials;

  useEffect(() => {
    if (!email || !password) {
      return;
    }
    setProgress(true);
    const fetch = async () => {
      try {
        const response = await axios.post("/admin/login/", {
          user: email,
          password,
        });
        setAdmin(response.data.isAdmin);
        setValid(true);
        window.location.reload();
      } catch (error) {
        setValid(false);
      } finally {
        setProgress(false);
      }
    };

    fetch();
  }, [email, password, setProgress, setValid, setAdmin]);

  return { isValid, progress, isAdmin };
};
