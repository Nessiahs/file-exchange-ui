import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "@reach/router";
import React from "react";
import { hover } from "../../config/classNames";
import { ROUTE_ADMIN_HOME } from "../../config/routes";
import { STORAGE_KEY } from "../../config/storage";
import { useLogedin } from "../../hooks/useLogedin";

export const Logout = () => {
  const navigate = useNavigate();
  const isLogedin = useLogedin();

  if (!isLogedin) {
    return null;
  }

  const onClick = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    navigate(`/${ROUTE_ADMIN_HOME}`);
    window.location.reload();
  };

  return (
    <div
      className={`${hover} w-6 h-6 cursor-pointer pt-1 rounded`}
      onClick={onClick}>
      <FontAwesomeIcon icon={faSignOutAlt} className="mx-auto block" />
    </div>
  );
};
