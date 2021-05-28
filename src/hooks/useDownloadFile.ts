import axios from "axios";
import { useEffect, useState } from "react";
import { TJobType } from "./useJobDetail";

export const useDownloadFile = (
  token: string | null,
  hashname: string | null,
  jobType?: TJobType
) => {
  const [progress, setProgress] = useState<null | number>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!hashname || !token) {
      setProgress(null);
      return;
    }

    const fetch = async () => {
      let uri = `/admin/download/${token}/${hashname}/`;
      if (jobType === "download") {
        uri = `/download/file/${hashname}/`;
      }

      try {
        const response = await axios.get(uri, {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setProgress(percentCompleted);
          },
        });

        const anker = document.createElement("a");
        anker.href = window.URL.createObjectURL(new Blob([response.data]));
        anker.setAttribute("download", response.headers["x-filename"]);
        document.body.appendChild(anker);
        anker.click();
        anker.remove();
      } catch (error) {
        setError(true);
      }
    };

    fetch();
  }, [token, hashname, setProgress, jobType]);

  return { progress, error };
};
