import React, { createContext } from "react";
import { Progress } from "../../components/Progress";
import { emailCheck, passwordStrength } from "../../config/checks";
import { errorStyle } from "../../config/classNames";
import { TogglePasswordType } from "./TogglePasswordType";
import { useCreateUserComponent } from "./useCreateUserComponent";
import { ValidIndicator } from "./ValidIndicator";

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
    progress,
    progressMessage,
    isEmailValid,
    emailId,
    email,
    emailChecked,
    isAdmin,
    isPasswordValid,
    passwordId,
    passwordType,
    isVerifiedPasswordValid,
    repeatId,
    passwordRepeatType,
    passwordRepeat,
    password,
    setEmail,
    setEmailValid,
    setAdmin,
    setPasswordType,
    setPassword,
    setPasswordValid,
    setPasswordRepeat,
    setToValidate,
    setPasswordRepeatType,
    setVerifiedPasswordValid,
    setProgress,
    setProgressMessage,
  } = useCreateUserComponent();

  return (
    <>
      <Progress className={!progress ? "hidden" : ""}>
        {progressMessage}
      </Progress>
      <div className={progress ? "hidden" : ""}>
        <div>
          <div
            className={`mt-2 p-1${isEmailValid === false ? errorStyle : ""}`}>
            <label htmlFor={emailId}>EMail</label>
            <div className="flex">
              <input
                id={emailId}
                type="email"
                className="w-full"
                autoFocus
                placeholder="examplte@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    return;
                  }
                  if (!emailCheck.test(e.target.value)) {
                    return setEmailValid(false);
                  } else if (forceAdmin) {
                    return setEmailValid(true);
                  }
                  setToValidate(e.target.value);
                }}
              />
              <ValidIndicator isValid={isEmailValid} />
            </div>
            <div
              className={`text-sm ${
                isEmailValid === false ? "" : " invisible"
              }`}>
              {emailChecked === false
                ? "Es gibt bereits einen User mit dieser Email"
                : "Bitte Prüfen sie die Email"}
            </div>
          </div>
          <div className={forceAdmin ? "hidden" : ""}>
            <label>Administrator</label>
            <select
              value={isAdmin}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val === 0 || val === 1) {
                  setAdmin(val);
                }
              }}>
              <option value={0}>User</option>
              <option value={1}>Administrator</option>
            </select>
          </div>
          <div className={`mt-2${isPasswordValid === false ? errorStyle : ""}`}>
            <label htmlFor={passwordId}>Passwort </label>
            <div className="flex">
              <TogglePasswordType
                type={passwordType}
                toggleType={(t) => setPasswordType(t)}
              />
              <input
                id={passwordId}
                type={passwordType}
                className="w-full border-l-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    return;
                  }
                  setPasswordValid(passwordStrength.test(e.target.value));
                }}
              />
              <ValidIndicator isValid={isPasswordValid} />
            </div>
            <div className={`text-sm`}>
              min 8 Zeichen und ein Großbuchstabe und eine Zahl
            </div>
          </div>
        </div>
        <div
          className={`mt-2${
            isVerifiedPasswordValid === false ? errorStyle : ""
          }`}>
          <label htmlFor={repeatId}>Passwort wiederholung</label>
          <div className="flex">
            <TogglePasswordType
              type={passwordRepeatType}
              toggleType={(t) => setPasswordRepeatType(t)}
              disabled={!isPasswordValid}
            />
            <input
              id={repeatId}
              type={passwordRepeatType}
              disabled={!isPasswordValid}
              className="w-full border-l-0"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  return;
                }
                setVerifiedPasswordValid(e.target.value === password);
              }}
            />
            <ValidIndicator isValid={isVerifiedPasswordValid} />
          </div>
          <div
            className={`text-sm ${
              isVerifiedPasswordValid === false ? "" : " invisible"
            }`}>
            Bitte Prüfen
          </div>
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
