import React, { useEffect, useState } from "react";

type TProgressProps = {
  id: string;
  mouseEnter: boolean;
  progress?: number | null;
  parentWidth: number;
  onClose: () => void;
};

export const Progress: React.FunctionComponent<TProgressProps> = ({
  onClose,
  mouseEnter,
  parentWidth,
  progress = null,
}) => {
  const ref = React.createRef<HTMLDivElement>();
  const [style, setStyle] = useState<React.CSSProperties>({
    maxWidth: "100%",
    transitionDuration: "5000ms",
  });

  useEffect(() => {
    if (progress) {
      // needed to move up in callstack
      setTimeout(() => {
        setStyle({
          transitionDuration: `${progress}ms`,
          maxWidth: "0%",
        });
      }, 0);
    }
  }, [progress, setStyle]);

  useEffect(() => {
    if (mouseEnter === true && ref.current && style.transitionDuration) {
      setStyle({
        maxWidth: `${ref.current.offsetWidth}px`,
      });
    } else if (
      mouseEnter === false &&
      ref.current &&
      !style.transitionDuration &&
      progress
    ) {
      setStyle({
        maxWidth: "0%",
        transitionDuration: `${
          (progress / 100) * ((ref.current.offsetWidth * 100) / parentWidth)
        }ms`,
      });
    }
  }, [mouseEnter, ref, style, setStyle, parentWidth, progress]);

  if (progress === null) {
    return null;
  }

  return (
    <div
      ref={ref}
      onTransitionEnd={(e) => {
        e.stopPropagation();
        if (e.currentTarget.style.maxWidth === "0%") {
          onClose();
        }
      }}
      className="transition-all ease-linear border-2 border-border"
      style={style}></div>
  );
};
