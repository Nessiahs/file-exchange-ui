import React, { useCallback, useState } from "react";
import { Portal } from "../Portal";
import { ToastContainer } from "./ToastContainer";

type TToast = {
  autoClose?: number | null;
  pauseOnHover?: boolean;
  intent?: "none" | "success" | "info" | "warning" | "danger";
};

type TPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type TToastProps = { position?: TPosition } & TToast;

type TPositions = Record<string, React.CSSProperties>;

const spacing = "10px";

const styleByPosition: TPositions = {
  "top-center": {
    top: spacing,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "top-left": {
    top: spacing,
    left: spacing,
  },
  "top-right": {
    top: spacing,
    right: spacing,
  },
  "bottom-center": {
    bottom: spacing,
    left: spacing,
    transform: "translateX(-50%)",
  },
  "bottom-left": {
    left: spacing,
    bottom: spacing,
  },
  "bottom-right": {
    right: spacing,
    bottom: spacing,
  },
};

let _toast: (t: TToasts) => void;

export type TToasts = {
  content: React.ReactNode;
  id: string;
} & TToast;

export const Toast: React.FunctionComponent<TToastProps> = ({
  autoClose = 3000,
  position = "top-center",
  pauseOnHover = true,
  intent = "none",
}) => {
  const defaultConf = {
    autoClose,
    position,
    pauseOnHover,
    intent,
  };

  const [toasts, setToast] = useState<TToasts[]>([]);
  const close = (id: string) => {
    setToast(toasts.filter((i) => i.id !== id));
  };

  _toast = useCallback(
    (t: TToasts) => {
      const item = { ...defaultConf, ...t };
      setToast([item, ...toasts]);
    },
    [defaultConf, setToast, toasts]
  );

  if (toasts.length === 0) {
    return null;
  }

  return (
    <Portal>
      <div className="absolute" style={styleByPosition[position]}>
        {toasts.map((t: TToasts) => (
          <ToastContainer
            {...t}
            onClose={(id: string) => close(id)}
            key={t.id}
          />
        ))}
      </div>
    </Portal>
  );
};

export const toast = (message: string | React.ReactNode, param?: TToast) => {
  if (typeof _toast !== "function") {
    return;
  }
  if (typeof message === "string") {
    message = <>{message}</>;
  }

  const id = `toast-${Math.random().toString(36).substr(2, 9)}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  _toast({ content: message, id, ...param });
};
