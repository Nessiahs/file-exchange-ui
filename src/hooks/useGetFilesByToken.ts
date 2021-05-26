import axios from "axios";
import { useEffect, useState } from "react";
export type TFiles = {
  id: number;
  token: string;
  filename: string;
  hashname: string;
  created_at: string;
  size: number;
};

export const useGetFilesByToken = (token: string) => {
  const [files, setFiles] = useState<TFiles[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetch = async () => {
      const result = await axios.get(`admin/files/${token}`);

      setFiles(result.data);
    };

    fetch();
  }, [token]);

  return files;
};
