import { useParams } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUpload = (
  file: File,
  upload: boolean,
  type: "admin" | "customer" = "customer"
) => {
  const [progress, setProgress] = useState(0);
  const { token } = useParams();

  useEffect(() => {
    if (!upload || !file) {
      return;
    }
    let url = "/upload/file/";
    if (type === "admin") {
      if (!token) {
        return;
      }
      url = `/admin/upload/file/${token}/`;
    }

    const formData = new FormData();
    formData.append("file", file);
    axios.post(url, formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setProgress(percentCompleted);
      },
    });
  }, [upload, file, type, token, setProgress]);

  return progress;
};
