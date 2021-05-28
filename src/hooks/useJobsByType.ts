import axios from "axios";
import { useEffect, useState } from "react";
import { TJob, TJobType } from "./useJobDetail";

export const useJobsByType = (type: TJobType) => {
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`/admin/jobs/${type}`);
        setJobs(result.data);
      } catch (error) {
        setError(true);
      }
    };

    fetch();
  }, [type]);

  return { jobs, error };
};
