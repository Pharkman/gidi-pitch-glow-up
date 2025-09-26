// hooks/useToast.ts
import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  className: "bg-white rounded-xl shadow-lg border p-3",
};

export const useToast = () => {
  return {
    success: (message: string) =>
      toast.success(message, {
        ...defaultOptions,
        className: `${defaultOptions.className} border-green-200 text-green-600 font-medium`,
      }),
    error: (message: string) =>
      toast.error(message, {
        ...defaultOptions,
        className: `${defaultOptions.className} border-red-200 text-red-600 font-medium`,
      }),
    warning: (message: string) =>
      toast.warning(message, {
        ...defaultOptions,
        className: `${defaultOptions.className} border-yellow-200 text-yellow-600 font-medium`,
      }),
  };
};
