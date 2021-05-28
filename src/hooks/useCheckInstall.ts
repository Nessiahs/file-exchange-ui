import axios from "axios";
import { useEffect, useState } from "react";

export const useCheckInstall = () => {
  const [isAllowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (isAllowed !== null) {
      return;
    }
    const fetch = async () => {
      try {
        await axios.get("/install/check/");
        setAllowed(false);
      } catch (error) {
        setAllowed(true);
      }
    };

    fetch();
  }, [isAllowed]);

  return isAllowed;
};
