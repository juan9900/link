import { useEffect, useState } from "react";
import { db, doc, collection, getDoc, getDocs } from "../constants/firebase";
import { linksCollection, usersCollection } from "../constants/constants";
import { onSnapshot } from "firebase/firestore";
export function useUserData(uid) {
  const [userData, setUserData] = useState({
    user: null,
  });

  const [userLinks, setUserLinks] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const searchLinks = async () => {
      if (uid) {
        // const docRef = doc(db, usersCollection, uid);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        //   setUserData((prevData) => ({
        //     ...prevData,
        //     ...docSnap.data(),
        //   }));

        //   setUserLinks(docSnap.data().links);
        // } else {
        //   console.log("No such document!");
        //   setUserData((prevData) => ({
        //     ...prevData,
        //     user: null,
        //   }));
        // }

        // setIsLoadingUserData(false);

        const docRef = doc(db, usersCollection, uid);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserData((prevData) => ({
              ...prevData,
              ...docSnap.data(),
            }));

            setUserLinks(docSnap.data().links);
          } else {
            console.log("No such document!");
            setUserData((prevData) => ({
              ...prevData,
              user: null,
            }));
          }

          setIsLoadingUserData(false);
        });

        return () => unsubscribe();
      }
    };
    searchLinks();
  }, [uid]);

  return { userData, isLoadingUserData, userLinks, setUserLinks };
}
