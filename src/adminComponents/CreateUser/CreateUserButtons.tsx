import React, { useContext, useEffect, useState } from "react";
import { CreateUserContext } from ".";
import { useCreateUser } from "../../hooks/useCreateUser";
type TCreateUserButtonsProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export const CreateUserButtons: React.FunctionComponent<TCreateUserButtonsProps> =
  ({ onClose, onSuccess }) => {
    const {
      email,
      password,
      isAdmin,
      isEmailValid,
      isPasswordValid,
      isVerifiedPasswordValid,
      setProgress,
      setProgressMessage,
    } = useContext(CreateUserContext);

    const [data, setData] = useState<{
      email: string;
      password: string;
      isAdmin: 0 | 1;
    }>({
      email: "",
      password: "",
      isAdmin: 0,
    });

    const { progress, success } = useCreateUser(
      data.email,
      data.password,
      data.isAdmin
    );

    useEffect(() => {
      if (!setProgress) {
        return;
      }
      setProgress(progress);
    }, [progress, setProgress]);

    useEffect(() => {
      if (success !== true) {
        return;
      }

      onSuccess();
    }, [success, setProgress, onSuccess]);

    useEffect(() => {
      if (setProgressMessage) {
        setProgressMessage(<>Benuter {email} wird angelegt!</>);
      }
    }, [setProgressMessage, email]);

    return (
      <div className="text-right pr-6">
        <button onClick={onClose}>Abbrechen</button>
        <button
          className="bg-green-600"
          disabled={
            !isEmailValid || !isPasswordValid || !isVerifiedPasswordValid
          }
          onClick={() => {
            if (!email || !password || isAdmin === undefined) {
              return;
            }
            setData({ email, password, isAdmin });
          }}>
          Anlegen
        </button>
      </div>
    );
  };
