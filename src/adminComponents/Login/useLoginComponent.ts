import React, { useEffect, useState } from "react";
import { TCredentials, useLogin } from "../../hooks/useLogin";
import { emailCheck } from "../../utils/vaidators";

const defaultFormClassName = "border-gray-500";
const errorFormClassName = "border-red-800 text-red-800 bg-red-400";

export const useLoginComponent = (hideLogin: (l: boolean) => void) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setError] = useState(false);
  const [credentials, setCredentials] = useState<TCredentials>({
    email: null,
    password: null,
  });
  const [isValidEmail, setValidEmail] = useState(true);
  const { isValid, progress } = useLogin(credentials);
  const [isDisabled, setDisabled] = useState(true);
  const [passwordOpacity, setPasswordOpacity] = useState(0);
  const [emailOpacity, setEmailOpacity] = useState(0);
  const [formClassName, setFormClassName] = useState(defaultFormClassName);

  useEffect(() => {
    if (isValid === true) {
      hideLogin(true);
    } else if (isValid === false) {
      setError(true);
    }
  }, [isValid, hideLogin, setError]);

  useEffect(() => {
    if (!email || !password || !isValidEmail) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password, isValidEmail, setDisabled]);

  useEffect(() => {
    let className = defaultFormClassName;
    if (hasError) {
      className = errorFormClassName;
    }

    setFormClassName(className);
  }, [hasError, setFormClassName]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setCredentials({ email, password });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    let opacity = 0;
    if (value) {
      opacity = 100;
    }

    setPasswordOpacity(opacity);
    setPassword(value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    let opacity = 0;
    if (value) {
      opacity = 100;
    }

    setEmailOpacity(opacity);
    setEmail(e.currentTarget.value);
  };

  const validateEmail = () => {
    setValidEmail(emailCheck.test(email));
  };

  return {
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
  };
};
