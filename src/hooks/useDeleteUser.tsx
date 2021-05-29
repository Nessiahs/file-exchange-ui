import axios from "axios";
import { useEffect, useState } from "react";

export const useDeleteUser = (user: number | null) => {
  const [progress, setProgress] = useState<boolean | null>(null);

  useEffect(() => {
    if (user === null) {
      return;
    }
    setProgress(true);
    const fetch = async () => {
      try {
        await axios.delete(`/admin/user/${user}`);
        setProgress(false);
      } catch (error) {
        setProgress(false);
      }
    };

    fetch();
  }, [user]);

  return progress;
};
