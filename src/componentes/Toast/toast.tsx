import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const opts: ToastOptions<{}> = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

function showToast(
  message: string,
  type: "info" | "success" | "warn" | "error" | undefined,
  opt?: ToastOptions<{}>
) {
  let options = opt ? { ...opts, ...opt } : opts;
  switch (type) {
    case "info":
      toast.info(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
}

export default showToast;
