import React from "react";
import { useCreateUserButtonComponent } from "./useCreateUserButtonComponent";
type TCreateUserButtonsProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export const CreateUserButtons: React.FunctionComponent<TCreateUserButtonsProps> =
  ({ onClose, onSuccess }) => {
    const { isDisabled, onClick } = useCreateUserButtonComponent(onSuccess);
    return (
      <div className="text-right pr-6">
        <button onClick={onClose}>Abbrechen</button>
        <button
          className="bg-green-600"
          disabled={isDisabled()}
          onClick={onClick}>
          Anlegen
        </button>
      </div>
    );
  };
