"use client";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/constants/firebase";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [authData, setAuthData] = useState(null);
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setAuthData({ user });
        // ...
      } else {
        console.log("not logged");
        router.push("/signin");
      }
    });
    return unsuscribe;
  }, []);
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
