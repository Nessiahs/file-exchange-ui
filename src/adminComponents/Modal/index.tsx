import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TModalProps = {
  onClose: () => void;
  header: string;
};
export const Modal: React.FunctionComponent<TModalProps> = ({
  header,
  children,
  onClose,
}) => {
  return (
    <div
      className="border overflow-hidden border-gray-500 absolute rounded bg-white top-48 p-3 left-1/2 w-1/2"
      style={{ transform: "translateX(-50%)" }}
      onClick={(e) => e.stopPropagation()}>
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute top-1 right-1 cursor-pointer opacity-30 hover:opacity-80"
        onClick={onClose}
      />
      <div>
        <div>{header}</div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};
