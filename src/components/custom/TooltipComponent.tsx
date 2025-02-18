import React from "react";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface TooltipComponentProps {
  id?: string;
  content?: string;
  children?: React.ReactNode;
}

export const TooltipComponent = ({
  id,
  content,
  children,
}: TooltipComponentProps) => {
  return (
    <>
      <Tooltip
        id={id}
        style={{
          background: "#000000",
          color: "#ffffff",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.375rem",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "0.875rem",
          maxWidth: "320px",
          textAlign: "center",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      />
      <div data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </div>
    </>
  );
};
