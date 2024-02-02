import { create } from "zustand";

const useUserState = create((set) => ({
  userData: null,
  setData: ({ firstName, lastName, uid }) =>
    set((state) => ({
      userData: {
        firstName,
        lastName,
        uid,
      },
    })),
}));
