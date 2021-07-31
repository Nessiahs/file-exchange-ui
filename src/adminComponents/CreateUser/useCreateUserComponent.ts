import React, { useCallback, useState } from "react";
import { vaidatePassword, validateEmail } from "../../utils/vaidators";

export const useCreateUserComponent = () => {
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState<0 | 1>(0);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState<boolean>();
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [isVerifiedPasswordValid, setVerifiedPasswordValid] =
    useState<boolean>();
  const [progressMessage, setProgressMessage] = useState<React.ReactNode>(null);
  const [progress, setProgress] = useState(false);

  const [isEmailValid, setEmailValid] = useState<boolean>();

  const onEmailBlur = useCallback(() => {
    setEmailValid(validateEmail(email));
  }, [setEmailValid, email]);

  const onIsAdminChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = Number(e.target.value);
      if (val === 0 || val === 1) {
        setAdmin(val);
      }
    },
    [setAdmin]
  );

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const onPasswordBlur = useCallback(() => {
    setPasswordValid(vaidatePassword(password));
  }, [password, setPasswordValid]);

  const onPasswordRepeatChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      setPasswordRepeat(val);
      if (val.length < password.length) {
        return;
      }

      if (val !== password) {
        setVerifiedPasswordValid(false);
      } else if (val === password) {
        setVerifiedPasswordValid(true);
      }
    },
    [setPasswordRepeat, password, setVerifiedPasswordValid]
  );

  return {
    isEmailValid,
    progress,
    progressMessage,
    email,
    isAdmin,
    isPasswordValid,
    isVerifiedPasswordValid,
    passwordRepeat,
    password,
    onEmailChange,
    onEmailBlur,
    onIsAdminChange,
    onPasswordChange,
    onPasswordBlur,
    onPasswordRepeatChange,
    setProgress,
    setProgressMessage,
  };
};
