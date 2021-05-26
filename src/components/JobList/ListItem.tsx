import { useNavigate } from "@reach/router";
import moment from "moment";
import React from "react";
import {
  ROUTE_ADMIN_DOWNLOAD_DETAILS,
  ROUTE_ADMIN_UPLOADS_DETAILS,
} from "../../config/routes";
import { TJob } from "../../hooks/useJobDetail";
import { ExpireInfo } from "../ExpireInfo";
import { SecretIcon } from "../SecretIcon";

export const ListItem: React.FunctionComponent<TJob> = ({
  jobName,
  jobType,
  created,
  expires,
  token,
  secret,
  files,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer hover:bg-blue-500 divide-x"
      onClick={() => {
        let uri = `/admin/${ROUTE_ADMIN_DOWNLOAD_DETAILS}/${token}/`;
        if (jobType === "upload") {
          uri = `/admin/${ROUTE_ADMIN_UPLOADS_DETAILS}/${token}/`;
        }
        navigate(uri);
      }}>
      <div className="flex-grow p-1">{jobName}</div>
      <div className="w-40 p-1">
        {moment(created).format("DD.MM.YYYY HH:MM")}
      </div>
      <div className="w-40 p-1">
        <ExpireInfo expires={expires} />
      </div>
      <div className="w-16 p-1 text-center">
        <SecretIcon secret={secret} />
      </div>
      <div className="w-12 text-center pt-1">{files}</div>
    </div>
  );
};
