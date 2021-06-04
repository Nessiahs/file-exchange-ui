import axios from "axios";
import { useEffect, useState } from "react";
import { TSettingsKey, TSettingsRequest } from "./settings";

export const useSaveSetting = (
  setting: TSettingsKey,
  data: TSettingsRequest
) => {
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (data === null) {
      return;
    }
    setProgress(true);
    const fetch = async () => {
      try {
        await axios.put(`/admin/setting/${setting}/`, {
          data: JSON.stringify(data),
        });
        setProgress(false);
      } catch (error) {
        setProgress(false);
        setError(true);
      }
    };
    fetch();
  }, [setting, data, setProgress]);

  return { progress, error };
};
