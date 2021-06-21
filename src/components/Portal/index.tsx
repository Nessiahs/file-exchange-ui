import React, { useEffect } from "react";
import { createPortal } from "react-dom";
export type TPortalProps = {
  className?: string;
  root?: HTMLElement;
};

export const Portal: React.FunctionComponent<TPortalProps> = ({
  className,
  children,
  root,
}) => {
  const [portalRoot, setPortalRoot] = React.useState<HTMLElement>();
  const [el, setEl] = React.useState<HTMLElement>();

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
      if (className) {
        const userClasses = className.split(" ");
        element.classList.add(...userClasses);
      }
      setEl(element);
    }
  }, [el, setEl, className]);

  useEffect(() => {
    if (portalRoot && el) {
      portalRoot.appendChild(el);
    }
    return () => {
      if (portalRoot && el) {
        portalRoot.removeChild(el);
      }
    };
  }, [portalRoot, el]);

  if (!children || !portalRoot || !el) {
    return null;
  }

  return createPortal(children, el);
};
