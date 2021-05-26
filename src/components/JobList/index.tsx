import React from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { useJobsByType } from "../../hooks/useJobsByType";
import { ListItem } from "./ListItem";

type TJobListProps = {
  jobType: TJobType;
};
export const JobList: React.FunctionComponent<TJobListProps> = ({
  jobType,
}) => {
  const jobs = useJobsByType(jobType);
  return (
    <div className="divide-y">
      <div className="flex cursor-pointer divide-x bg-gray-400">
        <div className="flex-grow p-1">Jobname</div>
        <div className="w-40 p-1">Erstellt</div>
        <div className="w-40 p-1">Ablaufdatum</div>
        <div className="w-16 p-1">Secret</div>
        <div className="w-12 p-1">Files</div>
      </div>
      {jobs.map((job, i) => (
        <ListItem {...job} key={`job-list-item-${i}`} />
      ))}
    </div>
  );
};
