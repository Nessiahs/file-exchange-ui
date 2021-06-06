import React from "react";
import { TJobType } from "../../hooks/useJobDetail";
import { useSecretInputComponent } from "./useSecretInputComponent";

type TSecretProps = {
  jobType: TJobType;
  refresh: () => void;
};

export const SecretInput: React.FunctionComponent<TSecretProps> = ({
  jobType,
  refresh,
}) => {
  const { secret, progress, validOpacity, buttonDisabled, onChange, onSubmit } =
    useSecretInputComponent(jobType, refresh);
  return (
    <div className="container mx-auto">
      <div className="text-xl w-2/3 border rounded mx-auto text-center bg-red-300 border-red-600 p-3">
        <p>
          Ihr {jobType === "download" ? "Download" : "Upload"} ist durch eine
          zusätzliche Eingabe geschützt
        </p>
        <form onSubmit={onSubmit}>
          <div>
            <input
              disabled={progress}
              type="text"
              value={secret}
              onChange={onChange}
              className="mt-2"
              placeholder="Secret"
            />
            <div
              className={`text-red-900 text-sm p-2 transition-opacity duration-700 opacity-${validOpacity} `}>
              Bitte überprüfen Sie das Secret
            </div>
            <button type="submit" disabled={buttonDisabled}>
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
