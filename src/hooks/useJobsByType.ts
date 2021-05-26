import axios from "axios";
import { useEffect, useState } from "react";
import { TJob, TJobType } from "./useJobDetail";

export const useJobsByType = (type: TJobType) => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`/admin/jobs/${type}`);
        setJobs(result.data);
      } catch (error) {}
    };

    fetch();
  }, [type]);

  return jobs;
};
