import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TGroupToggleProps = {
  isOpen: boolean | null;
};
export const GroupToggle: React.FunctionComponent<TGroupToggleProps> = ({
  isOpen,
}) => {
  if (isOpen === null) {
    return null;
  }

  return (
    <div className="px-2 pt-1">
      <FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretUp} />
    </div>
  );
};
