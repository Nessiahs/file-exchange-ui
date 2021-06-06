import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DeleteButton } from "../../components/DeleteButton";
import { hover } from "../../config/classNames";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { TUser } from "../../hooks/useUserList";
import { IsAdmin } from "./IsAdmin";

type TUserRowProps = {
  onRefresh: () => void;
} & TUser;
export const UserRow: React.FunctionComponent<TUserRowProps> = ({
  id,
  email,
  created,
  lastLogin,
  isAdmin,
  onRefresh,
}) => {
  const [del, setDelete] = useState<number | null>(null);
  const progress = useDeleteUser(del);

  useEffect(() => {
    if (progress !== false) {
      return;
    }
    onRefresh();
  }, [progress, onRefresh]);

  return (
    <div className={`flex divide-x ${hover}`}>
      <div className="w-8 text-center">{id}</div>
      <div className="flex-grow p-1">{email}</div>
      <div className="w-36 p-1">{moment(created).format("LLL")}</div>
      <div className="w-28 p-1">{moment(lastLogin).format("LLL")}</div>
      <div className="w-16 p-1">
        <IsAdmin isAdmin={isAdmin} />
      </div>
      <div className="w-10 p-1">
        {id !== 1 ? (
          <>
            <DeleteButton
              className={progress === true ? "hidden" : ""}
              onClick={() => {
                setDelete(id);
              }}
            />
            <FontAwesomeIcon
              icon={faSpinner}
              className={!progress ? "hidden" : "animate-spin"}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
