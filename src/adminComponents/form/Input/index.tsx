import React, { useEffect, useState } from "react";
import { errorStyle } from "../../../config/classNames";
import { uuid } from "../../../utils/uuid";
import { ValidIndicator } from "../ValidIndicator";

type TInputProps = {
  value: string;
  isValid?: boolean | null;
  errorMessage?: React.ReactNode | string;
  placeholder?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input: React.FunctionComponent<TInputProps> = ({
  value,
  isValid,
  errorMessage,
  placeholder = "",
  label = "",
  onChange,
  onBlur,
}) => {
  const [id] = useState(uuid());
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!placeholder || (placeholder && value)) {
      setOpacity(100);
    } else {
      setOpacity(0);
    }
  }, [value, placeholder, setOpacity]);

  return (
    <div className={`mt-2 p-1${isValid === false ? errorStyle : ""}`}>
      <label
        htmlFor={id}
        className={`w-full transition-opacity duration-700 opacity-${opacity}`}>
        {label}
      </label>
      <div className="flex">
        <input
          id={id}
          type="text"
          className="w-full"
          autoFocus
          placeholder={placeholder}
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
      <div className={`text-xs pt-1 ${isValid === false ? "" : " invisible"}`}>
        {errorMessage}
      </div>
    </div>
  );
};
