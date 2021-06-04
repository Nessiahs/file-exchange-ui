import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TBadgeProps = {
  label: string;
  onDelete: () => void;
};

export const Badge: React.FunctionComponent<TBadgeProps> = ({
  label,
  onDelete,
}) => {
  return (
    <div className="border-gray-400 border mb-1 px-2 py-1 text-xs rounded-full no-wrap bg-blue-500 align-middle text-white">
      {label}
      <FontAwesomeIcon
        icon={faTimes}
        className="ml-2 hover:text-black text-gray-400 cursor-pointer"
        onClick={onDelete}
      />
    </div>
  );
};
