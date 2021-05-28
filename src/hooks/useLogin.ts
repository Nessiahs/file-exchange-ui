import axios from "axios";
import { useEffect, useState } from "react";

export type TCredentials = {
  email: string | null;
  password: string | null;
};

export const useLogin = (credentials: TCredentials) => {
  const [isValid, setValid] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(false);
  const { email, password } = credentials;

  useEffect(() => {
    if (!email || !password) {
      return;
    }
    setProgress(true);
    const fetch = async () => {
      try {
        await axios.post("/admin/login/", {
          user: email,
          password,
        });
        setValid(true);
      } catch (error) {
        setValid(false);
      } finally {
        setProgress(false);
      }
    };

    fetch();
  }, [email, password, setProgress, setValid]);

  return { isValid, progress };
};
