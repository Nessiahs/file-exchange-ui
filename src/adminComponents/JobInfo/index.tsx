import moment from "moment";
import React from "react";
import { useSetCreatedBy } from "../../hooks/adminContext/useSetCreatedBy";
import { TJob } from "../../hooks/useJobDetail";
import { ExpireInfo } from "../ExpireInfo";
import { JobLink } from "../JobLink";
import { JobTypeIcon } from "../JobTypeIcon";
import { SecretIcon } from "../SecretIcon";
import { InfoBox } from "./InfoBox";
import { OwnerActions } from "./OwnerActions";
type TJobInfo = {
  data: TJob | null;
};

export const JobInfo: React.FunctionComponent<TJobInfo> = ({ data }) => {
  useSetCreatedBy(data);

  if (data === null) {
    return null;
  }
  const { jobName, created, jobType, secret, token, expires } = data;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 divide-y">
      <InfoBox title="Bechreibung">{jobName}</InfoBox>
      <InfoBox title="Erstellt">
        {moment(created).format("DD.MM.YYYY HH:mm")}
      </InfoBox>
      <InfoBox title="Type">
        <JobTypeIcon jobType={jobType} />
      </InfoBox>
      <InfoBox title="Secret">
        <SecretIcon secret={secret} /> {secret}
      </InfoBox>
      <InfoBox title="Link">
        <JobLink token={token} jobType={jobType} />
      </InfoBox>
      <InfoBox title="Gültig bis">
        <ExpireInfo expires={expires} />
      </InfoBox>
      <OwnerActions jobName={jobName} token={token} />
    </div>
  );
};
