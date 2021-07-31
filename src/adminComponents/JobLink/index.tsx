import { useLocation } from "@reach/router";
import React from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { CopyButton } from "../buttons/CopyButton";
type TJobLinkProps = {
  token: string;
  jobType: TJobType;
};

export const JobLink: React.FunctionComponent<TJobLinkProps> = ({
  token,
  jobType,
}) => {
  const location = useLocation();

  const uri = `${location.origin}/${jobType}/${token}/`;
  return (
    <div className="flex justify-between">
      <a href={uri} target="_blank" rel="noreferrer">
        Ansehen
      </a>
      <div className="mr-2">
        <CopyButton toCopy={uri} />
      </div>
    </div>
  );
};
