import axios from "axios";
import { useEffect, useState } from "react";
import { TFolderResponse } from "./useMyUploads";

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
