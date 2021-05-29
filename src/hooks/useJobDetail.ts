import axios from "axios";
import { useEffect, useState } from "react";
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

export type TFiles = {
  id: number;
  token: string;
  filename: string;
  hashname: string;
  created_at: string;
  size: number;
};

export type TJobType = "upload" | "download";

export const useJobDetail = (
  token: string,
  jobType: TJobType,
  fetchId = ""
) => {
  const [jobData, setJobData] = useState<TJob | null>(null);
  const [jobFiles, setJobFiles] = useState<TFiles[]>([]);
  const [error, setError] = useState(false);

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
      } catch (error) {
        setError(true);
      }
    };

    fetch();
  }, [token, fetchId, jobType, setJobData, setJobFiles]);

  return { jobData, jobFiles, error };
};
