import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TDeleteButton = {
  onClick: (param?: any) => void;
  className?: string;
};

export const DeleteButton: React.FunctionComponent<TDeleteButton> = ({
  onClick,
  className,
}) => {
  return (
    <div
      className={`w-7 border rounded border-red-600 text-red-600 text-center cursor-pointer
          hover:text-white hover:bg-red-600${className ? ` ${className}` : ""}`}
      onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};
