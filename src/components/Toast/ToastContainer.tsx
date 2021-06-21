import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TToasts } from ".";
import { Progress } from "./Progress";

export type TToastContainerProps = {
  onClose: (id: string) => void;
} & TToasts;

const intentStyle: { [key: string]: string } = {
  none: " bg-white border-gray-800",
  success: "bg-success border-green-800 text-white ",
  info: "bg-primary border-blue-800 text-white ",
  warning: "bg-warning border-yellow-800",
  danger: "bg-danger border-red-800 text-white font-bold",
};

export const ToastContainer: React.FunctionComponent<TToastContainerProps> = ({
  content: node,
  id,
  autoClose,
  pauseOnHover = true,
  intent = "none",
  onClose,
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const [progress, setProgress] = useState<number | null>(null);
  const [width, setWidth] = useState(0);

  const [cssProps, setCssProps] = useState({
    opacity: 0,
    maxHeight: "0",
  });

  useLayoutEffect(() => {
    if (!isOpen) {
      setCssProps({
        opacity: 0,
        maxHeight: "0",
      });
    }
  }, [isOpen, setCssProps]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setCssProps({
          opacity: 1,
          maxHeight: "900px",
        });
      }, 100);
    }
  }, [setCssProps, isOpen]);

  return (
    <div
      onTransitionEnd={(e) => {
        if (e.currentTarget.style.opacity === "0") {
          onClose(id);
        } else if (e.currentTarget.style.opacity === "1" && autoClose) {
          setWidth(e.currentTarget.offsetWidth);
          setProgress(autoClose);
        }
      }}
      onMouseEnter={() => {
        if (pauseOnHover) {
          setMouseEnter(true);
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          setMouseEnter(false);
        }
      }}
      className={`rounded  border-2 mb-2 p-2 w-96 relative transition-all duration-500 overflow-hidden ${intentStyle[intent]}`}
      style={{ ...cssProps }}>
      <div
        className="w-5 cursor-pointer opacity-40 hover:opacity-100 absolute top-1 right-0"
        onClick={() => {
          setOpen(false);
        }}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      {node}
      <Progress
        onClose={() => setOpen(false)}
        id={id}
        mouseEnter={mouseEnter}
        progress={progress}
        parentWidth={width}
      />
    </div>
  );
};
