import React, { useState } from "react";
import { useAnimatedHeight } from "../../hooks/effects/useAnimatedHeight";
import { useRotateEffect } from "../../hooks/effects/useRotateEffect";

export const useToggleTileComponent = (
  contentRef: React.RefObject<HTMLDivElement>,
  iconRef: React.RefObject<HTMLElement>
) => {
  const [isOpen, setOpen] = useState(true);
  useAnimatedHeight(contentRef, isOpen);
  useRotateEffect(iconRef, isOpen);
  const toggle = () => {
    setOpen(!isOpen);
  };

  return { toggle };
};
