import {
  faCogs,
  faDownload,
  faHome,
  faUpload,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {
  ROUTE_ADMIN_CREATE,
  ROUTE_ADMIN_DOWNLODS,
  ROUTE_ADMIN_UPLOADS,
  ROUTE_ADMIN_USERS,
} from "./routes";
export type TNavGroup = {
  title: string;
  icon: FontAwesomeIconProps["icon"];
  link?: string;
};

export type TNavSubmenu = {
  link: string;
  text: string;
};

export type TAdminNavigation = {
  group: TNavGroup;
  submenu?: TNavSubmenu[];
  needAdmin?: true;
};

export const adminNavigation: TAdminNavigation[] = [
  {
    group: {
      title: "Home",
      icon: faHome,
      link: "/",
    },
  },
  {
    group: {
      title: "Erstellen",
      icon: faUserShield,
      link: ROUTE_ADMIN_CREATE,
    },
  },
  {
    group: {
      title: "Uploads",
      icon: faUpload,
      link: ROUTE_ADMIN_UPLOADS,
    },
  },
  {
    group: {
      title: "Downloads",
      icon: faDownload,
      link: ROUTE_ADMIN_DOWNLODS,
    },
  },
  {
    needAdmin: true,
    group: {
      title: "Einstellungen",
      icon: faCogs,
    },
    submenu: [
      {
        text: "User",
        link: ROUTE_ADMIN_USERS,
      },
    ],
  },
];
