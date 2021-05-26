import axios from "axios";
import { useEffect, useState } from "react";
import { TFiles } from "./useGetFilesByToken";
import { TJobType } from "./useJobDetail";

export const useUserFiles = (jobType: TJobType) => {
  const [files, setFiles] = useState<TFiles[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/${jobType}/file-list/`);
        setFiles(response.data);
      } catch (error) {}
    };

    fetch();
  }, [jobType, setFiles]);

  return files;
};
