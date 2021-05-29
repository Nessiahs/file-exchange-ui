import React from "react";

type TProgressProps = {
  message?: string;
  className?: string;
};

export const Progress: React.FunctionComponent<TProgressProps> = ({
  message = "",
  children,
  className,
}) => {
  return (
    <div
      className={`text-center pt-20 h-96${className ? ` ${className}` : ""}`}>
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
