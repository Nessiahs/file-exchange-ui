import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TAddButtonProps = {
  onClick: (param?: any) => void;
  text?: string;
};

export const AddButton: React.FunctionComponent<TAddButtonProps> = ({
  onClick,
  text = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded bg-green-500 hover:bg-green-800 hover:bg-opacity-30 text-white flex`}>
      <div className={`pt-0.5${text ? " pl-2" : ""}`}>{text}</div>
      <div className="w-7 h-7">
        <FontAwesomeIcon icon={faPlus} className="mx-auto block mt-1.5" />
      </div>
    </div>
  );
};
