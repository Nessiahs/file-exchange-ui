import React from "react";
import { DeleteButton } from "../../adminComponents/DeleteButton";

type TFileDeleteProps = {
  progress: "delete" | "done" | "error" | null;
  show: boolean;
  onDelete: () => void;
};

export const FileDelete: React.FunctionComponent<TFileDeleteProps> = ({
  progress,
  onDelete,
  show,
}) => {
  if (!show) {
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
