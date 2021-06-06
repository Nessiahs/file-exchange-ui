import { faCopy } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const defaultIcon = { icon: faCopy, color: "" };

export const useCopyButtonComponent = (toCopy: string) => {
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

  return { icon, onClick };
};
