export type TSettingsKey = "ipRestrictions";

export type TIpRestriction = {
  restricted: boolean;
  allowedIp: string[];
  useProxy: boolean;
  proxyHeader: string[];
};

export type TSettingsRequest = TIpRestriction | null;
export type TSettingsResponse = TSettingsRequest;
