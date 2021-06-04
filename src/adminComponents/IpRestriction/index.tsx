import React from "react";
import { isIpAddress } from "../../config/checks";
import { BadgeInput } from "../BadgeInput";
import { LabeledCheckbox } from "../LabeledCheckbox";
import { ToggleTile } from "../ToggleTile";
import { useIpRestriction } from "./useIpRestriction";

export const IpRestriction: React.FunctionComponent = () => {
  const {
    restricted,
    allowedIp,
    useProxy,
    proxyHeader,
    setRestricted,
    setAllowedIp,
    setProxy,
    setProxyHeader,
    save,
  } = useIpRestriction();

  return (
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
            if (!isIpAddress.test(v)) {
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
        <div className="text-right py-2">
          <button className="bg-green-500" onClick={save}>
            Speichern
          </button>
        </div>
      </div>
    </ToggleTile>
  );
};
