import { useEffect, useState } from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { useVerifySecret } from "../../hooks/useVerifySecret";

export const useSecretInputComponent = (
  jobType: TJobType,
  refresh: () => void
) => {
  const [secret, setSecret] = useState("");
  const [submit, setSubmit] = useState<string | null>(null);
  const { isValid, progress } = useVerifySecret(submit, jobType);
  const [validOpacity, setValidOpacity] = useState<"0" | "100">("0");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (isValid === true && secret) {
      setSecret("");
      refresh();
    } else {
      setValidOpacity("100");
    }
  }, [isValid, secret, refresh, setSecret]);

  useEffect(() => {
    let isDisabled = true;
    if (secret && !progress) {
      isDisabled = false;
    }

    setButtonDisabled(isDisabled);
  }, [secret, progress, setButtonDisabled]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!secret || progress) {
      return;
    }

    setSubmit(secret);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
  };

  return {
    secret,
    submit,
    progress,
    validOpacity,
    buttonDisabled,
    setSecret,
    onChange,
    onSubmit,
  };
};
