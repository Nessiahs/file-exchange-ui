import { Link } from "@reach/router";
import React from "react";
import { adminNavigation } from "../../config/adminNavigation";
import { NavGroup } from "./NavGroup";

type TNavigationProps = {
  isAdmin: 0 | 1;
};

export const Navigation: React.FunctionComponent<TNavigationProps> = ({
  isAdmin,
}) => {
  return (
    <>
      {adminNavigation.map((config, i) => {
        if (config.needAdmin && isAdmin !== 1) {
          return null;
        }
        return (
          <NavGroup {...config.group} key={`menu-${config.group.title}-${i}`}>
            {config?.submenu
              ? config.submenu.map((menu, i) => (
                  <div
                    className="p-1 hover:bg-gray-400 cursor-pointer"
                    key={`menu-${menu.link}-${i}`}
                  >
                    <Link to={menu.link}>{menu.text}</Link>
                  </div>
                ))
              : null}
          </NavGroup>
        );
      })}
    </>
  );
};
