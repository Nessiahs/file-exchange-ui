import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "@reach/router";
import React, { createRef, useState } from "react";
import { TNavGroup } from "../../config/adminNavigation";
import { hover } from "../../config/classNames";
import { useAnimatedHeight } from "../../hooks/effects/useAnimatedHeight";
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
  useAnimatedHeight(ref, isOpen);

  return (
    <>
      <div>
        <div
          className={`flex bg-gray-600 text-white cursor-pointer ${hover} transition-all`}
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
      <div ref={ref} className="overflow-hidden duration-300 bg-white">
        <div> {children}</div>
      </div>
    </>
  );
};
