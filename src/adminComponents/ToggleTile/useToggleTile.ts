import React, { useState } from "react";
import { useAnimatedHeight } from "../../hooks/effects/useAnimatedHeight";
import { useRotateEffect } from "../../hooks/effects/useRotateEffect";

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
