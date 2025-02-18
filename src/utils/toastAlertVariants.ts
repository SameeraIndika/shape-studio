import { toast } from "react-toastify";

export enum ToastVarient {
  ERROR,
  SUCCESS,
  WARN,
  INFO,
}

export function toastAlert(text: string | JSX.Element, variant?: ToastVarient) {
  let toastClass = "toast-default";

  switch (variant) {
    case ToastVarient.ERROR:
      toastClass = "toast-error";
      break;
    case ToastVarient.SUCCESS:
      toastClass = "toast-success";
      break;
    case ToastVarient.WARN:
      toastClass = "toast-warn";
      break;
    case ToastVarient.INFO:
      toastClass = "toast-info";
      break;
    default:
      toastClass = "toast-default";
      break;
  }

  switch (variant) {
    case ToastVarient.ERROR:
      toast.error(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        className: toastClass,
      });
      break;
    case ToastVarient.SUCCESS:
      toast.success(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        className: toastClass,
      });
      break;
    case ToastVarient.WARN:
      toast.warn(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        className: toastClass,
      });
      break;
    case ToastVarient.INFO:
      toast.info(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        className: toastClass,
      });
      break;
    default:
      toast(text, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        className: toastClass,
      });
      break;
  }
}
