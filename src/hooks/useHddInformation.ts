import axios from "axios";
import { useEffect, useState } from "react";

type TResponse = {
  disk: {
    size: number;
    free: number;
  };
  jobs: {
    all: number;
    byJob: Record<string, number>;
  };
};

export const useHddInformation = (fetchId: string = "") => {
  const [information, setInformation] = useState<TResponse | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/admin/disk-space/");

        setInformation(response.data);
      } catch (error) {
        setInformation(null);
      }
    };
    fetch();
  }, [fetchId, setInformation]);

  return information;
};
