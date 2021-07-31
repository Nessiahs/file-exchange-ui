import React, { createRef, useEffect, useState } from "react";
import { errorStyle } from "../../../config/classNames";
import { uuid } from "../../../utils/uuid";
import { ValidIndicator } from "../ValidIndicator";
import { TogglePasswordType, TSecureType } from "./TogglePasswordType";

type TsecretInputProps = {
  value: string;
  isValid?: boolean;
  label?: string;
  placeholder?: string;
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
  placeholder = "",
  onChange,
  onBlur,
}) => {
  const [id] = useState(uuid());
  const [opacity, setOpacity] = useState(0);
  const [inputType, setInputType] = useState<TSecureType>("password");
  const ref = createRef<HTMLInputElement>();

  useEffect(() => {
    if (!placeholder || (placeholder && value)) {
      setOpacity(100);
    } else {
      setOpacity(0);
    }
  }, [value, placeholder, setOpacity]);

  useEffect(() => {
    if (ref.current && disabled === false && focusOnEnabled) {
      ref.current.focus();
    }
  }, [disabled, focusOnEnabled, ref]);

  return (
    <div className={`mt-2 select-none${isValid === false ? errorStyle : ""}`}>
      <label
        htmlFor={id}
        className={`w-full transition-opacity duration-700 opacity-${opacity}`}>
        {label}
      </label>
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
          placeholder={placeholder}
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
