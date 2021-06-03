import React, { useContext } from "react";
import { AdminContext } from "../../path/admin";
import { AdminDelete } from "../AdminDelete";
import { InfoBox } from "./InfoBox";

export const OwnerActions: React.FunctionComponent = () => {
  const { isAdmin, userId, responseUser } = useContext(AdminContext);

  if (!isAdmin && !isAdmin && userId !== responseUser) {
    return null;
  }
  return (
    <>
      <InfoBox title="Löschen">
        <div className="flex justify-end">
          <AdminDelete onDelete={() => {}} />
        </div>
      </InfoBox>
      <InfoBox title="" />
    </>
  );
};
