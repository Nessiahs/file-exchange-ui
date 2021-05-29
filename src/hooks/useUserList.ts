import axios from "axios";
import { useEffect, useState } from "react";

export type TUser = {
  id: number;
  email: string;
  isAdmin: 0 | 1;
  created: string;
  lastLogin: string;
};

export const useUserList = (fetchId = "") => {
  const [userList, setUserList] = useState<TUser[]>([]);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setUserList([]);
    setProgress(true);
    const fetch = async () => {
      try {
        const response = await axios.get("/admin/users/");
        setUserList(response.data);
        setProgress(false);
      } catch (error) {}
    };

    fetch();
  }, [fetchId]);

  return { userList, progress };
};
