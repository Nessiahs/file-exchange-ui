import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "@reach/router";
import React, { createRef, useEffect, useState } from "react";
import { TNavGroup } from "../../config/adminNavigation";
import { hover } from "../../config/classNames";
import { GroupToggle } from "./GroupToggle";

export const NavGroup: React.FunctionComponent<TNavGroup> = ({
  icon,
  children,
  title,
  link,
}) => {
  const [isOpen, setOpen] = useState<boolean | null>(children ? true : null);
  const ref = createRef<HTMLDivElement>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!isOpen) {
      ref.current.style.maxHeight = "0px";
    } else {
      ref.current.style.maxHeight = "999px";
    }
  }, [ref, isOpen]);

  return (
    <>
      <div>
        <div
          className={`flex bg-gray-600 text-white cursor-pointer ${hover}`}
          onClick={() => {
            if (children) {
              setOpen(!isOpen);
            } else if (link) {
              navigate(`/admin/${link}/`);
            }
          }}>
          <div className="p-1">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="ml-2 leading-9 flex-1">{title}</div>
          <GroupToggle isOpen={isOpen} />
        </div>
      </div>
      <div
        ref={ref}
        className="transition-transform overflow-hidden duration-300 ease-linear bg-white"
        style={{ maxHeight: "999px" }}>
        <div> {children}</div>
      </div>
    </>
  );
};
