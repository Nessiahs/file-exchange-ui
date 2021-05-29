import axios from "axios";
import { useEffect, useState } from "react";

export const useVerifyEmail = (email: string | null) => {
  const [isValid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!email) {
      return;
    }

    const fetch = async () => {
      try {
        const response = await axios.post("/admin/verify-email/", {
          email,
        });
        setValid(response.data.allowed);
      } catch (error) {
        setValid(false);
      }
    };

    fetch();
  }, [email]);

  return isValid;
};
