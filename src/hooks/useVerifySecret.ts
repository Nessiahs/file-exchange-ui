import { useNavigate, useParams } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { ROUTE_USER_ERROR } from "../config/routes";
import { TJobType } from "./useJobDetail";

export const useVerifySecret = (secret: string | null, jobType: TJobType) => {
  const [isValid, setValid] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!secret) {
      return;
    }

    setProgress(true);
    const fetch = async () => {
      try {
        await axios({
          method: "post",
          url: "/verify-secret/",
          data: {
            secret,
          },
          headers: {
            "x-job-type": jobType,
            "x-job-token": token,
          },
        });
        setValid(true);
      } catch (error) {
        if (error.response.status === 400) {
          return navigate(`/${ROUTE_USER_ERROR}/`);
        }
        setValid(false);
      } finally {
        setProgress(false);
      }
    };

    fetch();
  }, [secret, jobType, token, setProgress, setValid, navigate]);

  return { isValid, progress };
};
