import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CopyButton } from "../CopyButton";

type TDisplayLinkProps = {
  link: string;
  onClose: () => void;
};

export const DisplayLink: React.FunctionComponent<TDisplayLinkProps> = ({
  link,
  onClose,
}) => {
  if (!link) {
    return null;
  }

  return (
    <div className="w-full p-2 h-24 border-green-800 bg-green-500 relative rounded">
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute top-1 right-1 cursor-pointer"
        onClick={onClose}
      />
      <div className="text-center">Upload erfolgreich erstellt</div>
      <div className="flex">
        URL für den Upload: {link}
        <CopyButton toCopy={link} />
      </div>
    </div>
  );
};
