import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  dangerBgStyle,
  dangerBgStyleHover,
  successBgStyle,
  successBgStyleHover,
} from "../../config/classNames";
import { Backdrop } from "../Backdrop";
import { Modal } from "../Modal";

type TConfirmProps = {
  toConfirm: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Confirm: React.FunctionComponent<TConfirmProps> = ({
  isOpen,
  toConfirm,
  children,
  onClose,
  onConfirm,
}) => {
  return (
    <Backdrop isOpen={isOpen}>
      <Modal onClose={onClose} header={toConfirm}>
        <div>
          <div className="flex text-yellow-600 py-3">
            <div className="w-20 mr-2 text-center overflow-hidden">
              <FontAwesomeIcon className="fa-3x" icon={faExclamationTriangle} />
            </div>
            {children}
          </div>
          <div className="flex">
            <div className="w-1/2 text-center cursor-pointer">
              <div
                className={`m-2 rounded border ${dangerBgStyle} ${dangerBgStyleHover}`}
                onClick={onClose}>
                Abbrechen
              </div>
            </div>
            <div className="w-1/2 text-center cursor-pointer">
              <div
                className={`m-2 border rounded ${successBgStyle} ${successBgStyleHover}`}
                onClick={onConfirm}>
                Weiter
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Backdrop>
  );
};
