import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TIsAdminProps = {
  isAdmin: 0 | 1;
};

export const IsAdmin: React.FunctionComponent<TIsAdminProps> = ({
  isAdmin,
}) => {
  let icon = faTimes;
  let color = "text-red-600";

  if (isAdmin === 1) {
    icon = faCheck;
    color = "text-green-600";
  }

  return (
    <FontAwesomeIcon icon={icon} className={`block mx-auto ${color} mt-1`} />
  );
};
