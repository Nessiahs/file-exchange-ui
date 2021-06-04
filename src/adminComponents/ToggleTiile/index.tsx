import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef } from "react";
import { useToggleTile } from "../../hooks/components/useToggleTile";

type TToggleTileProps = {
  title: string;
};

export const ToggleTile: React.FunctionComponent<TToggleTileProps> = ({
  title,
  children,
}) => {
  const contentRef = createRef<HTMLDivElement>();
  const iconRef = createRef<HTMLDivElement>();

  const { toggle } = useToggleTile(contentRef, iconRef);

  return (
    <div className=" transition-all">
      <div
        className="bg-gray-300 select-none p-2 text-lg font-bold flex rounded-t cursor-pointer relative border-gray-600 border border-b-0"
        onClick={toggle}>
        <div ref={iconRef} className="transform duration-300">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
        <div className="ml-2">{title}</div>
      </div>

      <div
        className="overflow-hidden border border-t-0  duration-300 border-gray-600 rounded-b"
        ref={contentRef}>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
