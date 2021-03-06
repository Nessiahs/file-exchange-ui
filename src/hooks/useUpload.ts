import { useParams } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "../components/Toast";

export const useUpload = (
  file: File,
  upload: boolean,
  type: "admin" | "customer" = "customer",
  onFinish: () => void
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
    const process = async () => {
      try {
        await axios.post(url, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setProgress(percentCompleted);
          },
        });
        toast(`Datei ${file.name} erfolgreich ├╝bertragen`, {
          autoClose: 5000,
          intent: "success",
        });
      } catch (error) {
        toast(`Fehler beim hochladen der Datei ${file.name}`, {
          autoClose: null,
          intent: "danger",
        });
      } finally {
        onFinish();
      }
    };
    process();
  }, [upload, file, type, token, setProgress, onFinish]);

  return progress;
};
