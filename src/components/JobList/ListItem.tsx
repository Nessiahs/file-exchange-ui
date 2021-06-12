import { useNavigate } from "@reach/router";
import React from "react";
import { ExpireInfo } from "../../adminComponents/ExpireInfo";
import { SecretIcon } from "../../adminComponents/SecretIcon";
import { hover } from "../../config/classNames";
import {
  ROUTE_ADMIN_DOWNLOAD_DETAILS,
  ROUTE_ADMIN_UPLOADS_DETAILS,
} from "../../config/routes";
import { TJob } from "../../hooks/useJobDetail";
import { getFormattedTimeByZone } from "../../utils/dateUtils";

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
      className={`flex cursor-pointer ${hover} divide-x`}
      onClick={() => {
        let uri = `/admin/${ROUTE_ADMIN_DOWNLOAD_DETAILS}/${token}/`;
        if (jobType === "upload") {
          uri = `/admin/${ROUTE_ADMIN_UPLOADS_DETAILS}/${token}/`;
        }
        navigate(uri);
      }}>
      <div className="flex-grow p-1">{jobName}</div>
      <div className="w-40 p-1">{getFormattedTimeByZone(created)}</div>
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
