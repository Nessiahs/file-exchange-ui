import prettyBytes from "pretty-bytes";
import React, { useContext } from "react";
import { useHddInformation } from "../../hooks/api/useHddInformation";
import { AdminContext } from "../../path/admin";
import { Tile } from "../Tile";

export const HostDiskSpace: React.FunctionComponent = () => {
  const { size, free } = useHddInformation();
  const context = useContext(AdminContext);
  if (!size || !free || !context || context.isAdmin === 0) {
    return null;
  }

  return (
    <Tile>
      Aktuelle HDD Daten: <br />
      Gesamtspeicher: {prettyBytes(size)} <br />
      Davon Frei: {prettyBytes(free)}
    </Tile>
  );
};
