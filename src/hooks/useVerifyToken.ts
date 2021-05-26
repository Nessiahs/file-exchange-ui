import { useLocation, useNavigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { ROUTE_USER_ERROR, ROUTE_USER_EXPIRED } from "../config/routes";
import { TJobType } from "./useJobDetail";

const notVerify = ["forbidden", "error", "expired", "success"];

export const useVerifyToken = (
  token?: string,
  jobType?: TJobType,
  viewId = ""
) => {
  const [needValidation, setNeedValidation] = useState<boolean | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !pathname) {
      return;
    }
    const fragments = pathname.replace(/\/$/, "").split("/");
    const step =
      token === fragments[fragments.length - 1]
        ? ""
        : fragments[fragments.length - 1];

    if (notVerify.includes(step)) {
      setNeedValidation(false);
      return;
    }

    const verify = async () => {
      try {
        await axios({
          method: "get",
          url: `/verify-job/`,
          headers: {
            "x-job-type": jobType,
            "x-job-token": token,
          },
        });
        setNeedValidation(false);
      } catch (error) {
        if (error.response.status === 403) {
          setNeedValidation(true);
        } else if (error.response.status === 400) {
          navigate(`/${ROUTE_USER_ERROR}/`);
        } else if (error.response.status === 406) {
          navigate(`/${ROUTE_USER_EXPIRED}/`);
        }
      }
    };

    verify();
  }, [token, pathname, jobType, viewId, setNeedValidation, navigate]);

  return needValidation;
};
