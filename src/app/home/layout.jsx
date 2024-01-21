"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, auth } from "../../utils/constants/firebase";
import Spinner from "@/components/Spinner";
import Appbar from "@/components/Appbar";

export default function layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setIsLoading(false);
        // ...
      } else {
        // User is signed out
        // ...
        router.replace("/signin");
      }
    });
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Appbar />
      {children}
    </>
  );
}