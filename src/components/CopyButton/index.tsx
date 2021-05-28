import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type TCopyProps = {
  toCopy: string;
};

const defaultIcon = { icon: faCopy, color: "" };

export const CopyButton: React.FunctionComponent<TCopyProps> = ({ toCopy }) => {
  const [icon, setIcon] = useState(defaultIcon);

  const onClick = async () => {
    try {
      await window.navigator.clipboard.writeText(toCopy);
      setIcon({ icon: faCheck, color: " text-green-600" });
    } catch (error) {
      setIcon({ icon: faExclamationTriangle, color: " text-red-800" });
    } finally {
      window.setTimeout(() => {
        setIcon(defaultIcon);
      }, 3000);
    }
  };

  return (
    <div
      className={`ml-2 border rounded w-7 text-center border-gray-500 cursor-pointer hover:bg-gray-500${icon.color}`}
      title="Kopieren"
      onClick={onClick}>
      <FontAwesomeIcon icon={icon.icon} />
    </div>
  );
};
