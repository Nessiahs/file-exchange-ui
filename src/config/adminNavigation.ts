import {
  faCogs,
  faDownload,
  faHome,
  faSignOutAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {
  ROUTE_ADMIN_DOWNLODS,
  ROUTE_ADMIN_LOGOUT,
  ROUTE_ADMIN_SECURITY,
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
      title: "Empfangene Dateien",
      icon: faUpload,
      link: ROUTE_ADMIN_UPLOADS,
    },
  },
  {
    group: {
      title: "Gesendete Dateien",
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
        text: "Benutzer",
        link: ROUTE_ADMIN_USERS,
      },
      {
        text: "Sicherheit",
        link: ROUTE_ADMIN_SECURITY,
      },
    ],
  },
  {
    group: {
      title: "Abmelden",
      icon: faSignOutAlt,
      link: ROUTE_ADMIN_LOGOUT,
    },
  },
];
