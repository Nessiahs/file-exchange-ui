import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCopyButtonComponent } from "./useCopyButtonComponent";

type TCopyProps = {
  toCopy: string;
};

export const CopyButton: React.FunctionComponent<TCopyProps> = ({ toCopy }) => {
  const { icon, onClick } = useCopyButtonComponent(toCopy);

  return (
    <div
      className={`ml-2 border rounded w-7 text-center border-gray-500 cursor-pointer hover:bg-gray-500${icon.color}`}
      title="Kopieren"
      onClick={onClick}>
      <FontAwesomeIcon icon={icon.icon} />
    </div>
  );
};
