import { useEffect } from "react";

type TRotate = 45 | 90 | 180;

export const useRotateEffect = (
  ref: React.RefObject<HTMLElement>,
  open: boolean | null,
  rotate: TRotate = 90
) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (open) {
      ref.current.classList.add(`rotate-${rotate}`);
    } else {
      ref.current.classList.remove(`rotate-${rotate}`);
    }
  }, [open, ref, rotate]);
};
