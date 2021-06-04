import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef } from "react";
import { useRotateEffect } from "../../hooks/effects/useRotateEffect";

type TGroupToggleProps = {
  isOpen: boolean | null;
};
export const GroupToggle: React.FunctionComponent<TGroupToggleProps> = ({
  isOpen = false,
}) => {
  const ref = createRef<HTMLDivElement>();
  useRotateEffect(ref, isOpen, 180);

  if (isOpen === null) {
    return null;
  }

  return (
    <div className="transition-all transform px-2 pt-1" ref={ref}>
      <FontAwesomeIcon icon={faCaretUp} />
    </div>
  );
};
