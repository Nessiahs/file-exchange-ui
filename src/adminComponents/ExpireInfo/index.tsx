import {
  faCalendarCheck,
  faCalendarTimes,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { getFormattedTimeByZone, getTimeByZone } from "../../utils/dateUtils";

type TExpireInfo = {
  expires?: string | null;
};

export const ExpireInfo: React.FunctionComponent<TExpireInfo> = ({
  expires,
}) => {
  if (!expires) {
    return <>Kein Ablaufdatum</>;
  }

  let icon = faCalendarCheck;
  let color = "text-green-700";
  if (getTimeByZone(expires) < moment()) {
    icon = faCalendarTimes;
    color = "text-red-700";
  }

  return (
    <div className={`flex ${color}`}>
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="ml-2 pt-0.5">{getFormattedTimeByZone(expires)}</div>
    </div>
  );
};
