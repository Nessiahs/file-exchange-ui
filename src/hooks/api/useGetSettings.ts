import axios from "axios";
import { useEffect, useState } from "react";
import { TSettingsKey, TSettingsResponse } from "./settings";

export const useGetSettings = (
  setting: TSettingsKey,
  renderId: string = ""
) => {
  const [result, setResult] = useState<TSettingsResponse>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/admin/setting/${setting}/`);

        if (response.data === null) {
          return setResult(null);
        }

        setResult(JSON.parse(response.data.settings));
      } catch (error) {
        setResult(null);
      }
    };
    fetch();
  }, [setting, renderId, setResult]);

  return result;
};
