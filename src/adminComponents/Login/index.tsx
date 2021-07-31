import React from "react";
import { Progress } from "../../components/Progress";
import { Input } from "../form/Input";
import { SecretInput } from "../form/SecretInput";
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

  return (
    <div className={`w-96 border rounded mx-auto p-2 mt-10 ${formClassName}`}>
      <form onSubmit={onSubmit}>
        <div className="font-bold text-lg">Login</div>

        <Input
          label="Email"
          placeholder="example@example.com"
          value={email}
          onChange={onEmailChange}
          onBlur={validateEmail}
          isValid={isValidEmail}
          errorMessage="Bitte gültige Email eingeben!!"
        />

        <SecretInput
          placeholder="Password"
          label="Password"
          onChange={onPasswordChange}
          value={password}
        />

        <div className="text-center mt-2">
          <button type="submit" className="w-full ml-0" disabled={isDisabled}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
