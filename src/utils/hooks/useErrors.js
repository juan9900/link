import { create } from "zustand";

const useErrors = create((set) => ({
  errorCode: "",
  errorMessage: "",
  resetErrors: () =>
    set((state) => ({
      errorCode: "",
      errorMessage: "",
    })),
  setErrors: ({ errorCode, errorMessage }) =>
    set((state) => ({
      errorCode: errorCode,
      errorMessage: errorMessage,
    })),
}));

export default useErrors;
