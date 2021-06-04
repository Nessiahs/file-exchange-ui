import React, { useEffect } from "react";

export const useAnimatedHeight = (
  ref: React.RefObject<HTMLElement>,
  open: boolean | null
) => {
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    if (open) {
      ref.current.classList.remove("hidden");
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    } else {
      ref.current.style.height = "0";
    }
  }, [ref, open]);
};
