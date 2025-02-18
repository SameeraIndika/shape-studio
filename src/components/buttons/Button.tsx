import React from "react";
import { LucideIcon } from "lucide-react";

// Color variant types
export type ColorVariantType =
  | "primary"
  | "outline-primary"
  | "secondary"
  | "outline-secondary"
  | "accent"
  | "outline-accent"
  | "success"
  | "outline-success"
  | "warning"
  | "outline-warning"
  | "error"
  | "outline-error"
  | "light"
  | "outline-light"
  | "link";

// Get color variant
const getColorVariant = (colorvariant?: ColorVariantType) => {
  switch (colorvariant) {
    case "primary":
      return "bg-tc_primary hover:opacity-95 text-tc_white";
    case "outline-primary":
      return "text-tc_primary hover:text-tc_white border border-tc_primary hover:bg-tc_primary  ";
    case "secondary":
      return "bg-tc_secondary hover:opacity-95 text-tc_white";
    case "outline-secondary":
      return "text-tc_secondary hover:text-tc_white border border-tc_secondary hover:bg-tc_secondary";
    case "accent":
      return "bg-tc_accent hover:opacity-95 text-tc_white";
    case "outline-accent":
      return "text-tc_accent hover:text-tc_white border border-tc_accent hover:bg-tc_accent";
    case "success":
      return "bg-tc_success hover:opacity-95 text-tc_white";
    case "outline-success":
      return "text-tc_success hover:text-tc_white border border-tc_success hover:bg-tc_success";
    case "warning":
      return "bg-tc_warning hover:opacity-95 text-tc_white";
    case "outline-warning":
      return "text-tc_warning hover:text-tc_white border border-tc_warning hover:bg-tc_warning";
    case "error":
      return "bg-tc_error hover:opacity-95 text-tc_white";
    case "outline-error":
      return "text-tc_error hover:text-tc_white border border-tc_error hover:bg-tc_error";
    case "light":
      return "bg-tc_white hover:opacity-95 text-tc_primary";
    case "outline-light":
      return "text-tc_white hover:text-tc_primary border border-tc_white hover:bg-tc_white";
    case "link":
      return "text-tc_accent hover:underline underline-offset-2";

    default:
      return "bg-tc_primary hover:opacity-95 text-tc_white";
  }
};

export interface IButtonProps {
  type?: "button" | "submit";
  isLink?: boolean;
  colorvariant?: ColorVariantType;
  buttonWidthClass?: string;
  buttonHeightClass?: string;
  label?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right" | "center";
  iconWidth?: number;
  iconHeight?: number;
  onClick?: () => void;
}

export const Button = ({
  type = "button",
  isLink = false,
  colorvariant = "primary",
  buttonWidthClass = "w-fit",
  buttonHeightClass,
  label,
  icon: Icon,
  iconPosition = "left",
  iconWidth = 22,
  iconHeight = 22,
  onClick,
  ...props
}: IButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={`      
      flex items-center gap-x-1 rounded-md transition-all duration-200 ease-linear font-medium text-15 capitalize whitespace-nowrap
      ${isLink ? "" : "h-10 py-2 px-4"}
      ${
        iconPosition == "left"
          ? "justify-start"
          : iconPosition == "right"
          ? "justify-end"
          : !label && iconPosition == "center"
          ? "justify-center"
          : ""
      }
      ${getColorVariant(
        colorvariant
      )} ${buttonWidthClass} ${buttonHeightClass}`}
      onClick={onClick}
    >
      {Icon && iconPosition == "left" && (
        <Icon width={iconWidth} height={iconHeight} />
      )}
      {label && label}{" "}
      {Icon && iconPosition == "center" && (
        <Icon width={iconWidth} height={iconHeight} />
      )}
      {Icon && iconPosition == "right" && (
        <Icon width={iconWidth} height={iconHeight} />
      )}
    </button>
  );
};
