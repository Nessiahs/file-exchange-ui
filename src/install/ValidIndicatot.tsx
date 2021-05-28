import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TValidIndicatorProps = {
  isValid: boolean | null;
};

export const ValidIndicator: React.FunctionComponent<TValidIndicatorProps> = ({
  isValid,
}) => {
  let content = null;

  let color = "text-green-800";
  if (!isValid) {
    color = "text-red-800";
  }

  if (isValid !== null) {
    content = (
      <FontAwesomeIcon
        icon={isValid ? faCheck : faTimes}
        className="absolute top-1/2 left-1/2 block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    );
  }

  return <div className={`w-8 relative ${color}`}>{content}</div>;
};
