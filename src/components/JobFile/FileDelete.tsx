import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TFileDeleteProps = {
  progress: "delete" | "done" | "error" | null;
  onDelete: () => void;
  show: boolean;
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
      <div
        className={`w-6 h-6 border rounded border-red-600 text-red-600 text-center cursor-pointer
          hover:text-white hover:bg-red-600 ${
            progress === "delete" ? "hidden" : ""
          }`}
        onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};
