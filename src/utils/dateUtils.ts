import moment from "moment";
import "moment-timezone";
const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTimeByZone = (utcTime?: string) => {
  const d = moment(utcTime, "YYYY-MM-DD HH:mm:ss").utc(true);
  return d.tz(zone);
};

export const getFormattedTimeByZone = (utcTime: string) => {
  const f = getTimeByZone(utcTime);
  if (f.isValid()) {
    return f.format("DD.MM.YYYY HH:mm");
  }
  return "";
};
