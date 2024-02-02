"use client";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged, signOut } from "@/utils/constants/firebase";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const handleLogOut = () => {
    localStorage.clear();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/signin");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsLogged(true);
        // ...
      } else {
        // User is signed out
        // ...
        setIsLogged(false);
      }
    });
  }, []);
  if (isLogged) {
    return (
      <button className="text-red-600" onClick={() => handleLogOut()}>
        Sign Out
      </button>
    );
  }
  return (
    <button className="text-green-600" onClick={() => signIn()}>
      Sign In
    </button>
  );
};

export default SignInButton;
