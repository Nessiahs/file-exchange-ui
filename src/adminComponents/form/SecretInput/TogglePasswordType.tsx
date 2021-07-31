import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type TSecureType = "text" | "password";

export type TTogglePasswordTypeProps = {
  type: TSecureType;
  disabled?: boolean;
  toggleType: (type: TSecureType) => void;
};
export const TogglePasswordType: React.FunctionComponent<TTogglePasswordTypeProps> =
  ({ type, disabled, toggleType }) => {
    return (
      <div
        className={`absolute left-0  border-r-0 bg-transparent h-10 w-10 cursor-pointer${
          disabled ? " opacity-50" : ""
        } `}
        onClick={() => {
          toggleType(type === "password" ? "text" : "password");
        }}>
        <FontAwesomeIcon
          icon={type === "password" ? faEyeSlash : faEye}
          className="absolute top-1/2 left-1/2 block"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    );
  };
