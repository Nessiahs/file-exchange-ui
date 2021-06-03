import { useNavigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";

export const useDeleteJob = (token: string | null) => {
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      return;
    }

    setProgress(true);
    const fetch = async () => {
      try {
        await axios.delete(`/admin/job/${token}`);
        setProgress(false);
        window.history.back();
      } catch (error) {
        setProgress(false);
        setError(true);
      }
    };

    fetch();
  }, [token, setProgress, setError]);
  return { progress, error };
};
