import React from "react";

export const Tile: React.FunctionComponent = ({ children }) => {
  return (
    <div className="border border-gray-700 rounded p-2 bg-white">
      {children}
    </div>
  );
};
