"use client";

import { ReactNode, useEffect, useState } from "react";

import { LucideIcon, X } from "lucide-react";

import { Button, ColorVariantType } from "../buttons/Button";

interface ModalContainerProps {
  title?: string;
  icon?: LucideIcon;
  iconColor?: string;
  message?: string;
  closeButton?: boolean;
  onClose?: () => void;
  cancelButton?: boolean;
  onCancel?: () => void;
  actionButton?: boolean;
  actionButtonLabel?: string;
  actionButtonColorVarient?: ColorVariantType;
  onAction?: () => void;
  isOpen?: boolean;
  popupWidthClass?: string;
  children?: ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  icon: Icon,
  iconColor,
  message,
  closeButton,
  onClose,
  cancelButton,
  onCancel,
  actionButton,
  actionButtonLabel,
  actionButtonColorVarient,
  onAction,
  isOpen,
  popupWidthClass,
  children,
}) => {
  const [showModalPopup, setShowModalPopup] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModalPopup(true);
    } else {
      setTimeout(() => setShowModalPopup(false), 500);
    }
  }, [isOpen]);

  if (!showModalPopup) {
    return null;
  }

  if (!showModalPopup) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none bg-tc_ol_1">
        <div
          className={
            popupWidthClass
              ? `relative ${popupWidthClass} my-6 mx-auto h-fit`
              : "relative w-[360px] md:w-[520px] my-6 mx-auto h-fit"
          }
        >
          <div
            className={`
              translate duration-500
              ${showModalPopup ? "translate-y-0" : "translate-y-full"}
              ${showModalPopup ? "opacity-100" : "opacity-0"}
            `}
          >
            <div className="relative flex flex-col w-full bg-tc_primary translate rounded-md shadow-md">
              <div className="relative flex justify-center items-center w-full gap-x-2 px-4 py-4 border-b border-tc_border/10">
                <h2 className="font-sans text-base font-semibold text-tc_text_accent cursor-default">
                  {title}
                </h2>
                <div className="absolute right-4 flex text-tc_error">
                  {closeButton ? (
                    <button
                      onClick={onCancel}
                      className="flex justify-center items-center w-5 h-5"
                    >
                      <X width={20} height={20} />
                    </button>
                  ) : null}
                </div>
              </div>
              {(Icon || message) && (
                <div className="relative flex flex-col justify-center items-center w-full h-fit px-4 py-10 gap-y-4 border-b border-tc_border/60">
                  <div
                    className={`flex justify-center items-center w-16 h-16 rounded-full bg-${iconColor} bg-opacity-20`}
                  >
                    {Icon && <Icon className={`w-7 h-7 text-${iconColor}`} />}
                  </div>
                  {message && (
                    <span className="w-full font-sans text-15 font-normal text-tc_text_primary text-center">
                      {message}
                    </span>
                  )}
                </div>
              )}
              {children && (
                <div
                  className={`relative flex flex-col justify-center items-center w-full h-fit px-4 py-5 gap-y-4 ${
                    cancelButton || actionButton ? "border-b" : "border-none"
                  } border-tc_border/10`}
                >
                  {children}
                </div>
              )}
              <div
                className={`relative grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 px-4 ${
                  cancelButton || actionButton ? "py-4" : "py-0.5"
                }`}
              >
                {cancelButton && (
                  <Button
                    type="button"
                    label="No, Cancel"
                    buttonWidthClass="w-full"
                    colorvariant="outline-primary"
                    onClick={onCancel}
                  />
                )}
                {actionButton && (
                  <Button
                    type="button"
                    label={actionButtonLabel}
                    buttonWidthClass="w-full"
                    colorvariant={actionButtonColorVarient}
                    onClick={onAction}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
