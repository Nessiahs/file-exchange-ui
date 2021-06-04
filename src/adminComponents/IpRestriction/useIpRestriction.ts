import { useEffect, useState } from "react";
import { TIpRestriction } from "../../hooks/api/settings";
import { useGetSettings } from "../../hooks/api/useGetSettings";
import { useSaveSetting } from "../../hooks/api/useSaveSetting";

export const useIpRestriction = () => {
  const response: TIpRestriction | null = useGetSettings("ipRestrictions");
  const [restricted, setRestricted] = useState(false);
  const [allowedIp, setAllowedIp] = useState<string[]>([]);
  const [useProxy, setProxy] = useState(false);
  const [proxyHeader, setProxyHeader] = useState<string[]>([]);
  const [saveData, setSaveData] = useState<TIpRestriction | null>(null);
  const { progress, error } = useSaveSetting("ipRestrictions", saveData);
  const save = () => {
    setSaveData({ restricted, allowedIp, useProxy, proxyHeader });
  };

  useEffect(() => {
    if (response === null) {
      return;
    }
    setRestricted(response.restricted);
    setAllowedIp(response.allowedIp);
    setProxy(response.useProxy);
    setProxyHeader(response.proxyHeader);
  }, [response]);

  useEffect(() => {
    if (!progress) {
      setSaveData(null);
    }
  }, [progress]);

  return {
    restricted,
    allowedIp,
    useProxy,
    proxyHeader,
    setRestricted,
    setAllowedIp,
    setProxy,
    setProxyHeader,
    save,
  };
};
