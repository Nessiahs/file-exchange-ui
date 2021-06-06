import { useContext, useEffect, useState } from "react";
import { CreateUserContext } from ".";
import { useCreateUser } from "../../hooks/useCreateUser";

export const useCreateUserButtonComponent = (onSuccess: () => void) => {
  const {
    email,
    password,
    isAdmin,
    isEmailValid,
    isPasswordValid,
    isVerifiedPasswordValid,
    setProgress,
    setProgressMessage,
  } = useContext(CreateUserContext);

  const [data, setData] = useState<{
    email: string;
    password: string;
    isAdmin: 0 | 1;
  }>({
    email: "",
    password: "",
    isAdmin: 0,
  });

  const { progress, success } = useCreateUser(
    data.email,
    data.password,
    data.isAdmin
  );

  useEffect(() => {
    if (!setProgress) {
      return;
    }
    setProgress(progress);
  }, [progress, setProgress]);

  useEffect(() => {
    if (success !== true) {
      return;
    }

    onSuccess();
  }, [success, setProgress, onSuccess]);

  useEffect(() => {
    if (setProgressMessage) {
      setProgressMessage(<>Benuter {email} wird angelegt!</>);
    }
  }, [setProgressMessage, email]);

  const isDisabled = () => {
    return !isEmailValid || !isPasswordValid || !isVerifiedPasswordValid;
  };

  const onClick = () => {
    if (!email || !password || isAdmin === undefined) {
      return;
    }
    setData({ email, password, isAdmin });
  };

  return { onClick, isDisabled };
};
