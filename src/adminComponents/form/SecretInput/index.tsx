import React, { createRef, useEffect, useState } from "react";
import { errorStyle } from "../../../config/classNames";
import { uuid } from "../../../utils/uuid";
import { ValidIndicator } from "../ValidIndicator";
import { TogglePasswordType, TSecureType } from "./TogglePasswordType";

type TsecretInputProps = {
  value: string;
  isValid?: boolean;
  label?: string;
  helpText?: string;
  disabled?: boolean;
  focusOnEnabled?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const SecretInput: React.FunctionComponent<TsecretInputProps> = ({
  isValid,
  value,
  label = "",
  helpText = "",
  disabled = false,
  focusOnEnabled = false,
  errorMessage = "",
  onChange,
  onBlur,
}) => {
  console.log("--->", isValid);
  const [id] = useState(uuid());
  const [inputType, setInputType] = useState<TSecureType>("password");
  const ref = createRef<HTMLInputElement>();

  useEffect(() => {
    if (ref.current && disabled === false && focusOnEnabled) {
      ref.current.focus();
    }
    console.log("-----> effect");
  }, [disabled, focusOnEnabled, ref]);

  return (
    <div className={`mt-2 select-none${isValid === false ? errorStyle : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="relative flex">
        <TogglePasswordType
          disabled={disabled}
          type={inputType}
          toggleType={(t: TSecureType) => setInputType(t)}
        />
        <input
          ref={ref}
          disabled={disabled}
          id={id}
          type={inputType}
          className="w-full pl-10"
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            if (onBlur) {
              onBlur(e);
            }
          }}
        />
        <ValidIndicator isValid={isValid} />
      </div>
      <div className={`text-sm `}>{helpText}</div>
      <div className={`text-xs pt-1 ${isValid === false ? "" : " invisible"}`}>
        {errorMessage}
      </div>
    </div>
  );
};
