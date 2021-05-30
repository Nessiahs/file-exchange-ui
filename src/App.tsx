import { Link, Router } from "@reach/router";
import React from "react";
import { version } from "../package.json";
import { AdminHome } from "./adminComponents/AdminHome";
import { ErrorMessage } from "./components/ErrorMessage";
import { ExpiredMessage } from "./components/ExpiredMessage";
import { Header } from "./components/Header";
import { UserDownloadList } from "./components/UserDownloadList";
import { Verify } from "./components/Verify";
import "./config/axios";
import {
  ROUTE_ADMIN_CREATE,
  ROUTE_ADMIN_DOWNLOAD_DETAILS,
  ROUTE_ADMIN_DOWNLODS,
  ROUTE_ADMIN_UPLOADS,
  ROUTE_ADMIN_UPLOADS_DETAILS,
  ROUTE_ADMIN_USERS,
  ROUTE_DOWNLOAD_BASE,
  ROUTE_UPLOAD_BASE,
  ROUTE_USER_ERROR,
  ROUTE_USER_EXPIRED,
} from "./config/routes";
import { Install } from "./install/Install";
import { InstallCompleted } from "./install/InstallComplete";
import { VerifyInstall } from "./install/VerifyInstall";
import { Create } from "./pages/admin/Create";
import { DownloadsDetails } from "./pages/admin/DownloadDetails";
import { DownloadList } from "./pages/admin/DownloadList";
import { UploadDetail } from "./pages/admin/UploadDetail";
import { UploadList } from "./pages/admin/UploadList";
import { Users } from "./pages/admin/Users";
import { UploadPage } from "./pages/upload/UploadPage";
import { Admin } from "./path/admin";
function App() {
  return (
    <div className="h-full w-full">
      <div className="h-full flex flex-col">
        <Router className="bg-gray-800">
          <Header default />
        </Router>
        <div className="flex flex-1 p-1">
          <Router className="w-full">
            <ErrorMessage path={ROUTE_USER_ERROR} />
            <ExpiredMessage path={ROUTE_USER_EXPIRED} />

            <Verify path={ROUTE_DOWNLOAD_BASE} jobType="download">
              <UserDownloadList path="/" />
            </Verify>

            <Verify path={ROUTE_UPLOAD_BASE} jobType="upload">
              <UploadPage path="/" />
            </Verify>

            <Admin path="admin">
              <Create path={ROUTE_ADMIN_CREATE} />
              <DownloadList path={ROUTE_ADMIN_DOWNLODS} />
              <DownloadsDetails
                path={`${ROUTE_ADMIN_DOWNLOAD_DETAILS}/:token/`}
              />
              <UploadList path={ROUTE_ADMIN_UPLOADS} />
              <UploadDetail path={`${ROUTE_ADMIN_UPLOADS_DETAILS}/:token/`} />
              <Users path={ROUTE_ADMIN_USERS} />
              <AdminHome path="/" />
            </Admin>

            <VerifyInstall path="install">
              <Install path="/" />
            </VerifyInstall>

            <InstallCompleted path="/installation/completed/" />
          </Router>
        </div>
        <div className="bg-gray-800 text-white px-3">
          <div className="flex mx-auto container justify-between">
            <div>&copy; Nessiahs {new Date().getFullYear()}</div>
            <div>
              <Link to="/changelog/">Version: {version}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
