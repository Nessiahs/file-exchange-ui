import React, { useContext, useState } from "react";
import { useDeleteJob } from "../../hooks/useDeleteJob";
import { AdminContext } from "../../path/admin";
import { AdminDelete } from "../AdminDelete";
import { DeleteJobMessage } from "../Messages/DeleteJobMessage";
import { InfoBox } from "./InfoBox";
type TOwnerActionsProps = {
  jobName: string;
  token: string;
};
export const OwnerActions: React.FunctionComponent<TOwnerActionsProps> = ({
  jobName,
  token,
}) => {
  const { isAdmin, userId, responseUser } = useContext(AdminContext);
  const [deleteJob, setDelete] = useState<string | null>(null);
  const { progress, error } = useDeleteJob(deleteJob);

  if (!isAdmin && !isAdmin && userId !== responseUser) {
    return null;
  }

  return (
    <>
      <InfoBox title="Löschen">
        <div className="flex justify-end">
          <AdminDelete
            onDelete={() => {
              setDelete(token);
            }}>
            <DeleteJobMessage jobname={jobName} />
          </AdminDelete>
        </div>
      </InfoBox>
      <InfoBox title="" />
    </>
  );
};
