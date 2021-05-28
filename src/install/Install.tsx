import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Progress } from "../components/Progress";
import { TUseInstallProps, useInstall } from "../hooks/useInstall";
import { uuid } from "../services/uuid";
import { TogglePasswordType } from "./TogglePasswordType";
import { ValidIndicator } from "./ValidIndicatot";

const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
const errorStyle = " text-red-800 border border-red-800 rounded";
export const Install: React.FunctionComponent<RouteComponentProps> = () => {
  const [email, setEmail] = useState("");
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
  const [installData, setInstallData] = useState<TUseInstallProps>({
    email: "",
    password: "",
  });

  const { progress } = useInstall(installData);

  useEffect(() => {
    if (progress) {
      return;
    }

    setInstallData({ email: "", password: "" });
  }, [progress]);

  if (progress === true) {
    return (
      <Progress>
        <>
          Datenbank und Benutzer werden eingerichtet.
          <br />
          Dies kann einen Augenblick dauern
        </>
      </Progress>
    );
  }

  return (
    <div className="w-96 mx-auto border rounded mt-20 p-2">
      <h1 className="font-bold text-lg">Einrichtung</h1>
      <div>Bitte Daten für den ersten Benutzer eingeben</div>
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
            className={`text-sm ${isEmailValid === false ? "" : " invisible"}`}
          >
            Bitte Prüfen sie die Email
          </div>
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
        className={`mt-2${isVerifiedPasswordValid === false ? errorStyle : ""}`}
      >
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
          }`}
        >
          Bitte Prüfen
        </div>
      </div>
      <div className="mt-2 text-right">
        <button
          type="submit"
          disabled={
            !isEmailValid || !isPasswordValid || !isVerifiedPasswordValid
          }
          onClick={() => {
            setInstallData({ email, password });
          }}
        >
          Einrichten
        </button>
      </div>
    </div>
  );
};
