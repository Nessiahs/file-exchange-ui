import React from "react";

type TProgressProps = {
  message?: string;
};

export const Progress: React.FunctionComponent<TProgressProps> = ({
  message = "",
  children,
}) => {
  return (
    <div className="text-center pt-20 h-96">
      <div className="lds-roller ml-auto mr-auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>{message ? message : children}</div>
    </div>
  );
};
