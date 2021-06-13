import prettyBytes from "pretty-bytes";
import React, { useContext } from "react";
import { useHddInformation } from "../../hooks/useHddInformation";
import { AdminContext } from "../../path/admin";
import { Tile } from "../Tile";

export const HostDiskSpace: React.FunctionComponent = () => {
  const hddData = useHddInformation();
  const context = useContext(AdminContext);
  if (hddData === null || !context || context.isAdmin === 0) {
    return null;
  }
  const { size, free } = hddData.disk;
  return (
    <Tile>
      Aktuelle HDD Daten: <br />
      Gesamtspeicher: {prettyBytes(size)} <br />
      Davon Frei: {prettyBytes(free)}
    </Tile>
  );
};
