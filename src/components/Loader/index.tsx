import React from "react";

type TLoaderProps = {
  className?: string;
  text?: string;
};

export const Loader: React.FunctionComponent<TLoaderProps> = ({
  className,
  text,
}) => {
  return (
    <div className={`flex justify-center w-full ${className}`}>
      <div>
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <br />
        {text}
      </div>
    </div>
  );
};
