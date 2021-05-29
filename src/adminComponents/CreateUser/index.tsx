import React, { createContext, useState } from "react";
import { Progress } from "../../components/Progress";
import { emailCheck, passwordStrength } from "../../config/checks";
import { errorStyle } from "../../config/classNames";
import { uuid } from "../../services/uuid";
import { TogglePasswordType } from "./TogglePasswordType";
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
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState<0 | 1>(0);
  const [isEmailValid, setEmailValid] = useState<null | boolean>(null);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState<null | boolean>(null);
  const [passwordType, setPasswordType] =
    useState<"text" | "password">("password");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatType, setPasswordRepeatType] =
    useState<"text" | "password">("password");
  const [isVerifiedPasswordValid, setVerifiedPasswordValid] =
    useState<null | boolean>(null);
  const [emailId] = useState(uuid());
  const [passwordId] = useState(uuid());
  const [repeatId] = useState(uuid());
  const [progressMessage, setProgressMessage] = useState<React.ReactNode>(null);
  const [progress, setProgress] = useState(false);

  if (progress === true) {
    return <Progress>{progressMessage}</Progress>;
  }

  return (
    <>
      <div>
        <div className={`mt-2 p-1${isEmailValid === false ? errorStyle : ""}`}>
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
                setEmailValid(emailCheck.test(e.target.value));
              }}
            />
            <ValidIndicator isValid={isEmailValid} />
          </div>
          <div
            className={`text-sm ${isEmailValid === false ? "" : " invisible"}`}>
            Bitte Prüfen sie die Email
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
    </>
  );
};
