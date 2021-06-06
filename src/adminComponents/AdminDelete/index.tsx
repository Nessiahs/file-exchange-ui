import React, { useContext, useState } from "react";
import { DeleteButton } from "../../components/DeleteButton";
import { AdminContext } from "../../path/admin";
import { Confirm } from "../Confirm";

type TFileDeleteProps = {
  progress?: "delete" | "done" | "error" | null;
  onDelete: () => void;
  confirmHeader?: string;
};

export const AdminDelete: React.FunctionComponent<TFileDeleteProps> = ({
  progress = null,
  confirmHeader = "Wollen Sie diese Aktion wirklich",
  children,
  onDelete,
}) => {
  const { isAdmin, userId, responseUser } = useContext(AdminContext);
  const [confirmOpen, setOpen] = useState(false);
  if (
    !userId ||
    !responseUser ||
    (!isAdmin && !isAdmin && userId !== responseUser)
  ) {
    return null;
  }

  return (
    <>
      <Confirm
        toConfirm={confirmHeader}
        isOpen={confirmOpen}
        onConfirm={() => {
          onDelete();
        }}
        onClose={() => setOpen(false)}>
        {children}
      </Confirm>
      <div className="w-12 flex justify-center">
        <span className={progress === "delete" ? "hidden" : ""}>
          <DeleteButton onClick={() => setOpen(true)} />
        </span>
      </div>
    </>
  );
};
