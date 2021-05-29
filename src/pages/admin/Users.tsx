import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { AddButton } from "../../adminComponents/AddButton";
import { Backdrop } from "../../adminComponents/Backdrop";
import { CreateUser } from "../../adminComponents/CreateUser";
import { CreateUserButtons } from "../../adminComponents/CreateUser/CreateUserButtons";
import { Modal } from "../../adminComponents/Modal";
import { PageHeader } from "../../adminComponents/PageHeader";
import { UserList } from "../../adminComponents/UserList";
import { uuid } from "../../services/uuid";

export const Users: React.FunctionComponent<RouteComponentProps> = () => {
  const [addUser, setAddUser] = useState(false);
  const [renderId, setRenderId] = useState(uuid());
  return (
    <div>
      <Backdrop isOpen={addUser} closeOnClick={() => setAddUser(false)}>
        <Modal
          onClose={() => {
            setAddUser(false);
          }}
          header="Neuen Benutzer anlegen">
          <CreateUser>
            <CreateUserButtons
              onClose={() => setAddUser(false)}
              onSuccess={() => {
                setAddUser(false);
                setRenderId(uuid());
              }}
            />
          </CreateUser>
        </Modal>
      </Backdrop>
      <PageHeader title="Benutzer Admin-Interface">
        <AddButton onClick={() => setAddUser(true)} />
      </PageHeader>

      <UserList renderId={renderId} onRefresh={() => setRenderId(uuid())} />
    </div>
  );
};
