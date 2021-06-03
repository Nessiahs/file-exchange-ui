import React, { useContext } from "react";
import { DeleteButton } from "../../components/DeleteButton";
import { AdminContext } from "../../path/admin";

type TFileDeleteProps = {
  progress?: "delete" | "done" | "error" | null;
  onDelete: () => void;
};

export const AdminDelete: React.FunctionComponent<TFileDeleteProps> = ({
  progress = null,
  onDelete,
}) => {
  const { isAdmin, userId, responseUser } = useContext(AdminContext);

  if (!isAdmin && !isAdmin && userId !== responseUser) {
    return null;
  }
  return (
    <div className="w-12 flex justify-center">
      <span className={progress === "delete" ? "hidden" : ""}>
        <DeleteButton onClick={onDelete} />
      </span>
    </div>
  );
};
