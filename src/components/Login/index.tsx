import React from "react";
import { Progress } from "../Progress";
import { useLoginComponent } from "./useLoginComponent";

type TLoginProps = {
  hideLogin: (l: boolean) => void;
};

export const Login: React.FunctionComponent<TLoginProps> = ({ hideLogin }) => {
  const {
    progress,
    email,
    password,
    isDisabled,
    emailOpacity,
    passwordOpacity,
    isValidEmail,
    formClassName,
    onSubmit,
    onPasswordChange,
    onEmailChange,
    validateEmail,
  } = useLoginComponent(hideLogin);

  if (progress === true) {
    return <Progress message="Anmeldung" />;
  }

  const labelClassName = "w-full transition-opacity duration-700 opacity-";
  return (
    <div className={`w-96 border rounded mx-auto p-2 mt-10 ${formClassName}`}>
      <form onSubmit={onSubmit}>
        <div className="font-bold text-lg">Login</div>
        <div>
          <label className={labelClassName + emailOpacity}>
            Benutzername <span className="text-xs">(Email-Adresse)</span>
          </label>
          <input
            className="w-full"
            placeholder="example@example.com"
            value={email}
            type="text"
            onChange={onEmailChange}
            onBlur={validateEmail}
          />
          <div
            className={`text-red-800 transition-opacity duration-700 text-xs py-1 opacity-${
              isValidEmail ? "0" : "100"
            }`}>
            Bitte gültige Email eingeben!!
          </div>
        </div>
        <div>
          <label className={labelClassName + passwordOpacity}>Passwort</label>
          <input
            placeholder="Password"
            className="w-full"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="text-center mt-2">
          <button type="submit" className="w-full ml-0" disabled={isDisabled}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
