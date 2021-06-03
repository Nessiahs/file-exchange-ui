import React, { useEffect, useState } from "react";
import { TCredentials, useLogin } from "../../hooks/useLogin";
import { Progress } from "../Progress";

type TLoginProps = {
  hideLogin: (l: boolean) => void;
};

export const Login: React.FunctionComponent<TLoginProps> = ({ hideLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setError] = useState(false);
  const [credentials, setCredentials] = useState<TCredentials>({
    email: null,
    password: null,
  });
  const { isValid, progress } = useLogin(credentials);

  useEffect(() => {
    if (isValid === true) {
      hideLogin(true);
    } else if (isValid === false) {
      setError(true);
    }
  }, [isValid, hideLogin, setError]);

  if (progress === true) {
    return <Progress message="Anmeldung" />;
  }

  return (
    <div
      className={`w-96 border rounded mx-auto p-2 mt-10 ${
        hasError ? "border-red-800 text-red-800 bg-red-400" : "border-gray-500"
      }`}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!email || !password) {
            return;
          }
          setCredentials({ email, password });
        }}>
        <div className="font-bold text-lg">Login</div>
        <div>
          <label className="w-full">
            Benutzername <span className="text-xs">(Email-Adresse)</span>
          </label>
          <input
            className="w-full"
            placeholder="example@example.com"
            value={email}
            type="text"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="mt-2">
          <label
            className={`transition-opacity duration-700 ${
              password.length ? "opacity-100" : "opacity-0"
            }`}>
            Passwort
          </label>
          <input
            placeholder="Password"
            className="w-full"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>
        <div className="text-center mt-2">
          <button
            type="submit"
            className="w-full ml-0"
            disabled={!password || !email}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
