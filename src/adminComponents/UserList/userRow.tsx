import moment from "moment";
import React from "react";
import { hover } from "../../config/classNames";
import { TUser } from "../../hooks/useUserList";
import { DeleteButton } from "../DeleteButton";

export const UserRow: React.FunctionComponent<TUser> = ({
  id,
  email,
  created,
  lastLogin,
  isAdmin,
}) => {
  return (
    <div className={`flex divide-x ${hover}`}>
      <div className="w-8 text-center">{id}</div>
      <div className="flex-grow p-1">{email}</div>
      <div className="w-36 p-1">{moment(created).format("LLL")}</div>
      <div className="w-28 p-1">{moment(lastLogin).format("LLL")}</div>
      <div className="w-16 p-1">{isAdmin}</div>
      <div className="w-10 p-1">
        {id !== 1 ? <DeleteButton onClick={() => {}} /> : ""}
      </div>
    </div>
  );
};
