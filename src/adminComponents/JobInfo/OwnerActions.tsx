import React from "react";
import { useDeleteJobByOwner } from "../../hooks/adminContext/useOwnerActions";
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
  const { isOwner, onDelete } = useDeleteJobByOwner();

  if (!isOwner) {
    return null;
  }

  return (
    <>
      <InfoBox title="Löschen">
        <div className="flex justify-end">
          <AdminDelete
            onDelete={() => {
              onDelete(token);
            }}>
            <DeleteJobMessage jobname={jobName} />
          </AdminDelete>
        </div>
      </InfoBox>
      <InfoBox title="" />
    </>
  );
};
