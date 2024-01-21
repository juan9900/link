import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../constants/firebase";

export function useFirebaseAuthState() {
  const [userAuthData, setUserAuthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user);
        // ...
        setUserAuthData(user);
        setIsLoading(false);
      } else {
        // User is signed out
        // ...
        setIsLoading(false);
      }
    });
  }, []);

  return { userAuthData, isLoading };
}
