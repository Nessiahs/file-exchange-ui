import axios from "axios";
import { useEffect, useState } from "react";

export type TFolderResponse = {
  id: number;
  token: string;
  fileCount: number;
  description: string;
};

export const useMyUploads = () => {
  const [uploads, setUploads] = useState<TFolderResponse[] | null>(null);

  useEffect(() => {
    if (uploads !== null) {
      return;
    }

    const fetch = async () => {
      const response = await axios.get("admin/my-uploads");
      setUploads(response.data);
    };

    fetch();
  }, [uploads, setUploads]);

  return uploads;
};
