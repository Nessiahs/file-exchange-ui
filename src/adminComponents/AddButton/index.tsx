import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TAddButtonProps = {
  onClick: (param?: any) => void;
};

export const AddButton: React.FunctionComponent<TAddButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-7 h-7 cursor-pointer border rounded bg-green-500 hover:bg-green-800 hover:bg-opacity-30 text-white`}>
      <FontAwesomeIcon icon={faPlus} className="mx-auto block mt-1" />
    </div>
  );
};
