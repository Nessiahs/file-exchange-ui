import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [portalRoot, setPortalRoot] = useState<HTMLElement>();
  const [el, setEl] = useState<HTMLElement>();

  useEffect(() => {
    if (!portalRoot && !root) {
      setPortalRoot(document.body);
    } else if (!portalRoot && root) {
      setPortalRoot(root);
    }
  }, [portalRoot, setPortalRoot, root]);

  useEffect(() => {
    if (!el) {
      const element = document.createElement("div");
      element.classList.add("portal");
      setEl(element);
    }
  }, [el, setEl]);

  useEffect(() => {
    if (portalRoot && el) {
      portalRoot.appendChild(el);
      return () => {
        portalRoot.removeChild(el);
      };
    }
  }, [portalRoot, el]);

  if (!isOpen || !portalRoot || !el) {
    return null;
  }

  return createPortal(
    <div
      className="absolute inset-0 backdrop-filter backdrop-grayscale backdrop-blur"
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
