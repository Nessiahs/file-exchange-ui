import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
type THeaderProps = {
  title: string;
};

export const PageHeader: React.FunctionComponent<THeaderProps> = ({
  title,
}) => {
  return (
    <div className="flex">
      <div
        className="pt-1 mr-2 cursor-pointer"
        onClick={() => window.history.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className="text-2xl flex-grow font-bold">{title}</div>
    </div>
  );
};
