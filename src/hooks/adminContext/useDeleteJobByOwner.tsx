import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../path/admin";
import { useDeleteJob } from "../useDeleteJob";

export const useDeleteJobByOwner = () => {
  const { isAdmin, userId, responseUser } = useContext(AdminContext);
  const [deleteJob, setDelete] = useState<string | null>(null);
  const { progress, error } = useDeleteJob(deleteJob);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (isAdmin === 1 || userId === responseUser) {
      setIsOwner(true);
    }
  }, [isAdmin, userId, responseUser]);

  const onDelete = (token: string) => {
    if (!isOwner) {
      return;
    }
    setDelete(token);
  };

  return { isOwner, progress, error, onDelete };
};
