import React from "react";

type TInfoBoxProps = {
  title: string;
};

export const InfoBox: React.FunctionComponent<TInfoBoxProps> = ({
  title,
  children,
}) => {
  return (
    <div className="p-1 lg:flex">
      <div className="md:w-28">{title ? `${title}: ` : ""}</div>
      <div className="md:flex-grow">{children}</div>
    </div>
  );
};
