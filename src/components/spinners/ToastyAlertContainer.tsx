import React from "react";

import { Slide, ToastContainer } from "react-toastify";
import { X } from "lucide-react";

export default function ToastyAlertContainer() {
  return (
    <ToastContainer
      hideProgressBar={true}
      newestOnTop={true}
      draggable
      pauseOnHover
      theme="colored"
      transition={Slide}
      closeButton={<X className="text-tc_white absolute right-2.5" />}
    />
  );
}
