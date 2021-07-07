import React, { useState } from "react";

export type TUseBadgeInputProps = {
  value: string[];
  disabled?: boolean;
  className?: string;
  setValue: (v: string[]) => void;
  onValid?: (value: string) => string;
};

export const useBadgeInputComponent = (props: TUseBadgeInputProps) => {
  const { value, setValue, onValid, className, disabled } = props;
  const [error, setError] = useState("");
  let classNames = "";

  if (className) {
    classNames += " " + className;
  }

  if (disabled) {
    classNames += " cursor-not-allowed";
  }

  if (classNames) {
    classNames = classNames.trim();
  }

  const deleteValue = (d: string) => {
    const val = value.filter((v) => v !== d);
    setValue(val);
  };

  const addValue = (v: string) => {
    const duplicate = value.find((entry) => entry === v);
    if (duplicate) {
      setError(`Der Wert ${v} ist bereits vorhanden`);
      return true;
    }

    if (onValid) {
      const message = onValid(v);
      if (message) {
        setError(message);
        return false;
      }
    }

    const val = [...value];
    val.push(v);
    setValue(val);
    setError("");
    return true;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter" || e.code === "Space") {
      e.preventDefault();
      const val = e.currentTarget.textContent;
      if (val) {
        if (addValue(val)) {
          e.currentTarget.textContent = "";
        }
      }
    }
  };

  return { deleteValue, onKeyDown, error, classNames };
};
