import { useState } from "react";
import { useAnimatedHeight } from "../effects/useAnimatedHeight";
import { useRotateEffect } from "../effects/useRotateEffect";

export const useToggleTile = (
  contentRef: React.RefObject<HTMLDivElement>,
  iconRef: React.RefObject<HTMLElement>
) => {
  const [isOpen, setOpen] = useState(false);
  useAnimatedHeight(contentRef, isOpen);
  useRotateEffect(iconRef, isOpen);
  const toggle = () => {
    setOpen(!isOpen);
  };

  return { toggle };
};
