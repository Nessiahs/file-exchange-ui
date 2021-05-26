import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TJobType } from "../../hooks/useJobDetail";

type TJobTypIconProps = {
  jobType: TJobType | null;
};

export const JobTypeIcon: React.FunctionComponent<TJobTypIconProps> = ({
  jobType,
}) => {
  if (!jobType) {
    return null;
  }

  return (
    <>
      <FontAwesomeIcon
        icon={jobType === "upload" ? faUpload : faDownload}
        className="mr-2"
      />
      {jobType === "upload" ? "Upload" : "Download"}
    </>
  );
};
