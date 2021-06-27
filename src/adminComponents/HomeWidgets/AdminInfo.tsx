import prettyBytes from "pretty-bytes";
import React, { useContext } from "react";
import { useAdminJobState } from "../../hooks/adminContext/useAdminJobState";
import { useHddInformation } from "../../hooks/api/useHddInformation";
import { AdminContext } from "../../path/admin";
import { SheduledInfo } from "../ScheduledInfo";
import { Tile } from "../Tile";

export const AdminInfo: React.FunctionComponent = () => {
  const { size, free } = useHddInformation();
  const { info, jobs, expiredJobs } = useAdminJobState();
  const context = useContext(AdminContext);
  if (
    !size ||
    !free ||
    !context ||
    context.isAdmin === 0 ||
    !info ||
    !jobs ||
    !expiredJobs
  ) {
    return null;
  }

  return (
    <Tile>
      <div className="text-lg font-bold">Aktuelle HDD Daten:</div>
      <div className="text-xs">
        Gesamtspeicher: {prettyBytes(size)} <br />
        Davon Frei: {prettyBytes(free)}
      </div>
      <SheduledInfo name="Festplatteninfo" {...info} />
      <SheduledInfo name="Job Info" {...jobs} />
      <SheduledInfo name="Abgelaufene Dateien löschen" {...expiredJobs} />
    </Tile>
  );
};
