import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TTogglePasswordTypeProps = {
  type: "text" | "password";
  toggleType: (type: "text" | "password") => void;
  disabled?: boolean;
};
export const TogglePasswordType: React.FunctionComponent<TTogglePasswordTypeProps> =
  ({ type, toggleType, disabled }) => {
    return (
      <div
        className={`border border-gray-500 border-r-0 bg-white w-10 relative cursor-pointer${
          disabled ? " opacity-50" : ""
        }`}
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
