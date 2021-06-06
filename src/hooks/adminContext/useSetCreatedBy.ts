import { useContext, useEffect } from "react";
import { AdminContext } from "../../path/admin";
import { TJob } from "../useJobDetail";

export const useSetCreatedBy = (data: TJob | null) => {
  const { setResponseUser } = useContext(AdminContext);
  useEffect(() => {
    if (setResponseUser && data?.createdBy) {
      setResponseUser(data.createdBy);
    }
  }, [data, setResponseUser]);
};
