import moment from "moment";
import React from "react";
import { TJob } from "../../hooks/useJobDetail";
import { ExpireInfo } from "../ExpireInfo";
import { JobLink } from "../JobLink";
import { JobTypeIcon } from "../JobTypeIcon";
import { SecretIcon } from "../SecretIcon";
import { InfoBox } from "./InfoBox";
type TJobInfo = {
  data: TJob | null;
};

export const JobInfo: React.FunctionComponent<TJobInfo> = ({ data }) => {
  if (data === null) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 divide-y">
      <InfoBox title="Bechreibung">{data.jobName}</InfoBox>
      <InfoBox title="Erstellt">
        {moment(data.created).format("DD.MM.YYYY HH:mm")}
      </InfoBox>
      <InfoBox title="Type">
        <JobTypeIcon jobType={data.jobType} />
      </InfoBox>
      <InfoBox title="Secret">
        <SecretIcon secret={data.secret} /> {data.secret}
      </InfoBox>
      <InfoBox title="Link">
        <JobLink token={data.token} jobType={data.jobType} />
      </InfoBox>
      <InfoBox title="Gültig bis">
        <ExpireInfo expires={data.expires} />
      </InfoBox>
    </div>
  );
};
