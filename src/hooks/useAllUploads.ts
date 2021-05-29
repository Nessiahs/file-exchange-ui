import axios from "axios";
import { useEffect, useState } from "react";
export type TFolderResponse = {
  id: number;
  token: string;
  fileCount: number;
  description: string;
};
export const useAllUploads = (id: string | null) => {
  const [uploads, setUploads] = useState<TFolderResponse[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetch = async () => {
      const response = await axios.get("/admin/uploads/");
      setUploads(response.data);
    };
    fetch();
  });

  return uploads;
};
