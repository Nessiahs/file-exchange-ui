import { useNavigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { ROUTE_ADMIN_DOWNLOAD_DETAILS } from "../config/routes";

export type TJobData = {
  jobType: "upload" | "download";
  jobName: string;
  expires?: number;
};

export const useCreateJob = (data: TJobData | null) => {
  const [state, setState] = useState({
    progress: false,
    link: "",
    error: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data === null) {
      setState({
        progress: false,
        link: "",
        error: false,
      });
      return;
    }

    setState({ progress: true, link: "", error: false });
    const fetch = async () => {
      try {
        const response = await axios.post("/admin/create", data);
        if (data.jobType === "upload") {
          return setState({
            progress: false,
            link: response.data.link,
            error: false,
          });
        }

        navigate(
          `/admin/${ROUTE_ADMIN_DOWNLOAD_DETAILS}/${response.data.token}/`
        );
      } catch (error) {
        setState({ progress: false, link: "", error: true });
      }
    };

    fetch();
  }, [data, setState, navigate]);

  return state;
};
