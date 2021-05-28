import { useNavigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";

export type TUseInstallProps = {
  email: string;
  password: string;
};

export const useInstall = (data: TUseInstallProps) => {
  const { email, password } = data;
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !password) {
      return;
    }

    setProgress(true);
    const fetch = async () => {
      try {
        await axios.post("/install/create/", { email, password });
        navigate("/admin/");
      } catch (error) {
        setError(true);
        setProgress(false);
      }
    };

    fetch();
  }, [email, password, navigate]);

  return { progress, error };
};
