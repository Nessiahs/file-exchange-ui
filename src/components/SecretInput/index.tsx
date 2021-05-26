import { useEffect, useState } from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { useVerifySecret } from "../../hooks/useVerifySecret";

type TSecretProps = {
  jobType: TJobType;
  refresh: () => void;
};

export const SecretInput: React.FunctionComponent<TSecretProps> = ({
  jobType,
  refresh,
}) => {
  const [secret, setSecret] = useState("");
  const [submit, setSubmit] = useState<string | null>(null);
  const { isValid, progress } = useVerifySecret(submit, jobType);

  useEffect(() => {
    if (isValid === true && secret) {
      setSecret("");
      refresh();
    }
  }, [isValid, secret, refresh, setSecret]);

  return (
    <div className="container mx-auto">
      <div className="text-xl w-2/3 border rounded mx-auto text-center bg-red-300 border-red-600 p-3">
        <p>
          Ihr {jobType === "download" ? "Download" : "Upload"} ist durch eine
          zusätzliche Eingabe geschützt
        </p>
        <div>
          <input
            disabled={progress}
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="mt-2"
            placeholder="Secret"
          />
          <div
            className={`text-red-900 text-sm p-2${
              isValid === false ? "" : " invisible"
            } `}>
            Bitte überprüfen Sie das Secret
          </div>
          <button
            onClick={() => {
              setSubmit(secret);
            }}
            disabled={!secret || progress}>
            Anmelden
          </button>
        </div>
      </div>
    </div>
  );
};
