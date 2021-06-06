import React, { useEffect, useState } from "react";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { uuid } from "../../services/uuid";

export const useCreateUserComponent = () => {
  const [email, setEmail] = useState("");
  const [toValidate, setToValidate] = useState<string | null>(null);
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

  const emailChecked = useVerifyEmail(toValidate);

  useEffect(() => {
    if (emailChecked === null) {
      return;
    }
    setEmailValid(emailChecked);
  }, [emailChecked, setEmailValid]);

  return {
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
  };
};
