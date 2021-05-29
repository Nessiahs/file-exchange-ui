import React from "react";
import { Progress } from "../../components/Progress";
import { useUserList } from "../../hooks/useUserList";
import { UserRow } from "./userRow";

export const UserList: React.FunctionComponent = () => {
  const { userList, progress } = useUserList();

  if (progress) {
    return <Progress />;
  }

  return (
    <div className="divide-y border rounded">
      <div className="flex divide-x bg-blue-400">
        <div className="w-8 p-1">id</div>
        <div className="flex-grow p-1">User</div>
        <div className="w-36 p-1">Erstellt</div>
        <div className="w-28 p-1">Letzter Login</div>
        <div className="w-16 p-1"> Admin</div>
        <div className="w-10 p-1"></div>
      </div>

      {userList.map((user) => (
        <UserRow {...user} key={`user-row-${user.id}`} />
      ))}
    </div>
  );
};
