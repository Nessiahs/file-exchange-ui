import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { BadgeInput } from "../../adminComponents/BadgeInput";
import { LabeledCheckbox } from "../../adminComponents/LabeledCheckbox";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { ToggleTile } from "../../adminComponents/ToggleTile";

const pattern =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const Security: React.FunctionComponent<RouteComponentProps> = () => {
  const [restricted, setRestricted] = useState(false);
  const [allowedIp, setAllowedIp] = useState<string[]>([]);
  const [useProxy, setProxy] = useState(false);
  const [proxyHeader, setProxyHeader] = useState([
    "x-real-ip",
    "x-forwarded-for",
  ]);

  return (
    <>
      <Tile>
        <PageHeader title="Sicherheitseinstellungen" />
        <ToggleTile title="Api Zugriff">
          <div className="divide-y divide-gray-800 space-y-2">
            <LabeledCheckbox
              className="mb-3"
              value={restricted}
              label="Admin-Api IP beschränken"
              onChange={() => setRestricted(!restricted)}
            />
            <BadgeInput
              label="Zugriff von erlauben"
              value={allowedIp}
              setValue={(v: string[]) => setAllowedIp(v)}
              disabled={!restricted}
              onValid={(v: string) => {
                if (!pattern.test(v)) {
                  return `${v} ist keine gültige IP-Adresse`;
                }
                return "";
              }}
            />
            <LabeledCheckbox
              value={useProxy}
              label="Api ist hinter Proxy"
              disabled={!restricted}
              onChange={() => setProxy(!useProxy)}
            />
            <BadgeInput
              label="Proxy IP-Header"
              setValue={(v: string[]) => setProxyHeader(v)}
              value={proxyHeader}
              disabled={!useProxy}
            />
          </div>
        </ToggleTile>
      </Tile>
    </>
  );
};
