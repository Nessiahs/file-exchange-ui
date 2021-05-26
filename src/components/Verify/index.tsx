import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { useVerifyToken } from "../../hooks/useVerifyToken";
import { uuid } from "../../services/uuid";
import { SecretInput } from "../SecretInput";
interface IVerifyProps extends RouteComponentProps {
  token?: string;
  jobType: TJobType;
}
export const Verify: React.FunctionComponent<IVerifyProps> = ({
  token,
  children,
  jobType,
}) => {
  const [viewId, setViewId] = useState(uuid());
  const needValidation = useVerifyToken(token, jobType, viewId);

  if (needValidation === null) {
    return null;
  }

  if (needValidation === true) {
    return <SecretInput jobType={jobType} refresh={() => setViewId(uuid())} />;
  }

  return <div className="w-full">{children}</div>;
};
