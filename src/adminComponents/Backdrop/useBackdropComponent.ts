import { useEffect, useState } from "react";

export const useBackdropComponent = (root?: HTMLElement) => {
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

  return { el, portalRoot };
};
