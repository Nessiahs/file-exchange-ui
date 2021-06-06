import React from "react";
import { Badge } from "./Badge";
import {
  TUseBadgeInputProps,
  useBadgeInputComponent,
} from "./useBadgeInputComponent";

export type TBadgeInputProps = {
  label?: string;
} & TUseBadgeInputProps;

export const BadgeInput: React.FunctionComponent<TBadgeInputProps> = (
  props
) => {
  const { label, disabled, value } = props;
  const { deleteValue, onKeyDown, error, classNames } =
    useBadgeInputComponent(props);

  return (
    <div className={classNames}>
      <div>{label}</div>
      <div
        className={`border-gray-400 border rounded space-x-1 p-1 flex flex-wrap${
          disabled ? " bg-gray-200" : ""
        }`}>
        {value.map((val, i) => (
          <Badge
            key={`badge-${label}-${i}`}
            label={val}
            onDelete={() => deleteValue(val)}
          />
        ))}
        <div
          contentEditable={!disabled}
          className="h-6 flex-grow focus:outline-none "
          onKeyDown={onKeyDown}
          style={{ minWidth: "80px" }}></div>
      </div>
      <div className="text-red-600 text-xs h-5 overflow-hidden">{error}</div>
    </div>
  );
};
