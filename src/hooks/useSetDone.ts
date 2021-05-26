import { useNavigate } from "@reach/router";
import axios from "axios";
import { useEffect } from "react";

export const useSetDone = (hash?: string) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!hash) {
      return;
    }

    const request = async () => {
      try {
        await axios.put("/upload/done/", { hash });
        navigate(`/upload/${hash}/success/`);
      } catch (error) {}
    };

    request();
  }, [hash, navigate]);
};
