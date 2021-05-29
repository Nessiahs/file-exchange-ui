import React, { useContext, useEffect } from "react";
import { CreateUserContext } from "./CreateUser";
type TCreateUserButtonsProps = {
  onClose: () => void;
};

export const CreateUserButtons: React.FunctionComponent<TCreateUserButtonsProps> =
  ({ onClose }) => {
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

    useEffect(() => {}, [setProgressMessage, setProgress]);

    return (
      <div className="text-right pr-6">
        <button onClick={onClose}>Abbrechen</button>
        <button
          className="bg-green-600"
          disabled={
            !isEmailValid || !isPasswordValid || !isVerifiedPasswordValid
          }>
          Anlegen
        </button>
      </div>
    );
  };
