import { useLocation } from "@reach/router";
import React from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { CopyButton } from "../CopyButton";
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
    <div className="flex">
      <a href={uri} target="_blank" rel="noreferrer">
        Ansehen
      </a>
      <CopyButton toCopy={uri} />
    </div>
  );
};
