import { useEffect, useState } from "react";
import { db, doc, collection, getDoc, getDocs } from "../constants/firebase";
import { linksCollection, usersCollection } from "../constants/constants";
export function useUserData(uid) {
  const [userData, setUserData] = useState({
    user: null,
    links: [],
  });
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const searchLinks = async () => {
      if (uid) {
        const docRef = doc(db, usersCollection, uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData((prevData) => ({
            ...prevData,
            user: docSnap.data(),
          }));
        } else {
          console.log("No such document!");
          setUserData((prevData) => ({
            ...prevData,
            user: null,
          }));
        }
        // Fetch links data from the 'links' subcollection
        const linksCollectionRef = collection(docRef, linksCollection);
        const linksQuerySnapshot = await getDocs(linksCollectionRef);

        const linksDataArray = [];
        linksQuerySnapshot.forEach((doc) => {
          linksDataArray.push(doc.data());
        });

        console.log("Links Data:", linksDataArray);
        setUserData((prevData) => ({
          ...prevData,
          links: linksDataArray,
        }));

        setIsLoadingUserData(false);
      }
    };
    searchLinks();
  }, [uid]);

  return { userData, isLoadingUserData };
}
