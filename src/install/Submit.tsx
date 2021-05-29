import { useContext, useEffect, useState } from "react";
import { CreateUserContext } from "../adminComponents/CreateUser";
import { TUseInstallProps, useInstall } from "../hooks/useInstall";

export const Submit = () => {
  const {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    isVerifiedPasswordValid,
    setProgress,
    setProgressMessage,
  } = useContext(CreateUserContext);
  const [installData, setInstallData] = useState<TUseInstallProps>({
    email: "",
    password: "",
  });
  const { progress } = useInstall(installData);

  useEffect(() => {
    if (setProgressMessage) {
      setProgressMessage(
        <>
          Datenbank und Benutzer werden eingerichtet.
          <br />
          Dies kann einen Augenblick dauern
        </>
      );
    }
  }, [setProgressMessage]);

  useEffect(() => {
    if (setProgress) {
      setProgress(progress);
    }

    if (progress) {
      return;
    }

    setInstallData({ email: "", password: "" });
  }, [progress, setProgress]);
  return (
    <div className="mt-2 text-right">
      <button
        type="submit"
        disabled={!isEmailValid || !isPasswordValid || !isVerifiedPasswordValid}
        onClick={() => {
          if (!email || !password) {
            return;
          }
          setInstallData({ email, password });
        }}>
        Einrichten
      </button>
    </div>
  );
};
