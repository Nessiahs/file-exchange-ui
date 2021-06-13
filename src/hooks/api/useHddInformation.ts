import axios from "axios";
import { useEffect, useState } from "react";

type TResponse = {
  size: number | null;
  free: number | null;
};

const initState = {
  size: null,
  free: null,
};

export const useHddInformation = (fetchId: string = "") => {
  const [information, setInformation] = useState<TResponse>(initState);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/admin/disk-space/");

        setInformation(response.data);
      } catch (error) {
        setInformation(initState);
      }
    };
    fetch();
  }, [fetchId, setInformation]);

  return information;
};
