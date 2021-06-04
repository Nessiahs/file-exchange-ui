import React from "react";

type TLabeledCheckboxProps = {
  value: boolean;
  label: string;
  disabled?: boolean;
  className?: string;
  onChange: () => void;
};
export const LabeledCheckbox: React.FunctionComponent<TLabeledCheckboxProps> =
  ({ value, label, onChange, disabled = false, className }) => {
    let classNames = "flex";
    if (className) {
      classNames += " " + className;
    }

    return (
      <div className={classNames}>
        <div className="flex-grow">{label}</div>
        <div>
          <input
            disabled={disabled}
            type="checkbox"
            checked={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  };
