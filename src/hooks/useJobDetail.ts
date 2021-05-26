import axios from "axios";
import { useEffect, useState } from "react";
import { TFiles } from "./useGetFilesByToken";
export type TJob = {
  id?: number;
  jobType: TJobType;
  jobName: string;
  secret?: string | null;
  expires?: string | null;
  created?: string;
  token: string;
  createdBy: number;
  files: number;
};

export type TJobType = "upload" | "download";

export const useJobDetail = (
  token: string,
  jobType: TJobType,
  fetchId = ""
) => {
  const [jobData, setJobData] = useState<TJob | null>(null);
  const [jobFiles, setJobFiles] = useState<TFiles[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    setJobFiles([]);
    const fetch = async () => {
      try {
        const response = await axios.get(`/admin/info/${token}/${jobType}/`);
        setJobData(response.data.info);
        setJobFiles(response.data.files);
      } catch (error) {}
    };

    fetch();
  }, [token, fetchId, jobType, setJobData, setJobFiles]);

  return { jobData, jobFiles };
};
