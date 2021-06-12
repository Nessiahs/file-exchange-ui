import React from "react";
import { createPortal } from "react-dom";
import { useBackdropComponent } from "./useBackdropComponent";
export type TBackdropProps = {
  isOpen: boolean;
  className?: string;
  root?: HTMLElement;
  closeOnClick?: () => void;
};

export const Backdrop: React.FunctionComponent<TBackdropProps> = ({
  isOpen,
  children,
  root,
  closeOnClick,
}) => {
  const { el, portalRoot } = useBackdropComponent(root);

  if (!isOpen || !portalRoot || !el) {
    return null;
  }

  return createPortal(
    <div
      className="absolute inset-0 backdrop-filter backdrop-grayscale backdrop-blur-sm"
      onClick={() => {
        if (closeOnClick) {
          closeOnClick();
        }
      }}>
      {children}
    </div>,
    el
  );
};
