import { useToast } from "vue-toastification";

const toast = useToast();

export const isRTL = function (s: string | null) {
  if (!s) return false;

  const rtlChars = "\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC";
  const rtlDirCheck = new RegExp("^[^" + rtlChars + "]*?[" + rtlChars + "]");

  return rtlDirCheck.test(s);
};

export const showErrorMessage = (error: any) => {
  const message = error?.response?.data?.message || "An error has occurred.";
  toast.error(message);
};

export const showSuccessMessage = (message: any) => {
  const successMessage = message || "Loading Successfully";
  toast.success(successMessage);
};
