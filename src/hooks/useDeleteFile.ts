import axios from "axios";
import { useEffect, useState } from "react";

export const useDeleteFile = (
  id: null | number,
  type: "admin" | "customer" = "customer"
) => {
  const [progress, setProgress] =
    useState<null | "delete" | "done" | "error">(null);

  useEffect(() => {
    if (id === null) {
      return;
    }
    let uri = `/upload/file/${id}`;
    if (type === "admin") {
      uri = `/admin/file/${id}`;
    }

    const fetch = async () => {
      try {
        await axios.delete(uri);
        setProgress("done");
      } catch (error) {
        setProgress("error");
      }
    };

    setProgress("delete");
    fetch();
  }, [id, type, setProgress]);

  return progress;
};
