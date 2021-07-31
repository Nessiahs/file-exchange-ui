import React, { createContext } from "react";
import { Progress } from "../../components/Progress";
import { Input } from "../form/Input";
import { SecretInput } from "../form/SecretInput";
import { useCreateUserComponent } from "./useCreateUserComponent";

type TUserContext = {
  email: string;
  password: string;
  isAdmin: 0 | 1;
  isEmailValid: boolean | null;
  isPasswordValid: boolean | null;
  isVerifiedPasswordValid: boolean | null;
  setProgress: (p: boolean) => void;
  setProgressMessage: (m: React.ReactNode) => void;
};

type TCreateUserProps = {
  forceAdmin?: boolean;
};

export const CreateUserContext = createContext<Partial<TUserContext>>({});

export const CreateUser: React.FunctionComponent<TCreateUserProps> = ({
  forceAdmin,
  children,
}) => {
  const {
    isEmailValid,
    progress,
    progressMessage,
    email,
    isAdmin,
    isPasswordValid,
    isVerifiedPasswordValid,
    passwordRepeat,
    password,
    onIsAdminChange,
    onEmailChange,
    onPasswordChange,
    onPasswordBlur,
    onPasswordRepeatChange,
    setProgress,
    setProgressMessage,
    onEmailBlur,
  } = useCreateUserComponent();

  return (
    <>
      <Progress className={!progress ? "hidden" : ""}>
        {progressMessage}
      </Progress>
      <div className={progress ? "hidden" : ""}>
        <Input
          label="Email"
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          isValid={isEmailValid}
          errorMessage="Bitte gültige Email angeben"
        />

        <div>
          <div className={forceAdmin ? "hidden" : ""}>
            <label>Administrator</label>
            <select value={isAdmin} onChange={onIsAdminChange}>
              <option value={0}>User</option>
              <option value={1}>Administrator</option>
            </select>
          </div>
        </div>
        <SecretInput
          value={password}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          disabled={!isEmailValid}
          isValid={isPasswordValid}
          focusOnEnabled={true}
          label="Passwort"
          placeholder="Password"
          helpText="min 8 Zeichen und ein Großbuchstabe und eine Zahl"
        />

        <SecretInput
          value={passwordRepeat}
          onChange={onPasswordRepeatChange}
          disabled={!isPasswordValid}
          isValid={isVerifiedPasswordValid}
          focusOnEnabled={true}
          errorMessage="Passörter stimmen nicht überein"
          label="Passwort wiederholen"
          placeholder="Passwort wiederholen"
        />
        <div className="mt-2">
          <CreateUserContext.Provider
            value={{
              email,
              password,
              isAdmin,
              isEmailValid,
              isPasswordValid,
              isVerifiedPasswordValid,
              setProgress,
              setProgressMessage,
            }}>
            {children}
          </CreateUserContext.Provider>
        </div>
      </div>
    </>
  );
};
