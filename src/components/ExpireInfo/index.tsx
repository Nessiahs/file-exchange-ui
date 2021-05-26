import {
  faCalendarCheck,
  faCalendarTimes,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

type TExpireInfo = {
  expires?: string | null;
};

export const ExpireInfo: React.FunctionComponent<TExpireInfo> = ({
  expires,
}) => {
  if (expires === null) {
    return <>Kein Ablaufdatum</>;
  }

  let icon = faCalendarCheck;
  let color = "text-green-700";
  const date = moment(expires);
  if (date < moment()) {
    icon = faCalendarTimes;
    color = "text-red-700";
  }

  return (
    <div className={`flex ${color}`}>
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="ml-2 pt-0.5">{moment(expires).format("L")}</div>
    </div>
  );
};
