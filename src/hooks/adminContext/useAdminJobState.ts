import axios from "axios";
import { useEffect, useState } from "react";

export type TJobState = {
  state: boolean;
  lastExecute: string;
  failCount: number;
  executed: number;
};

type TState = {
  info: TJobState | null;
  jobs: TJobState | null;
  expiredJobs: TJobState | null;
};

export const useAdminJobState = () => {
  const [state, setState] = useState<TState>({
    info: null,
    jobs: null,
    expiredJobs: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get("/admin/job-state/");
        setState(result.data);
      } catch (error) {}
    };

    fetch();
  }, [setState]);

  return state;
};
