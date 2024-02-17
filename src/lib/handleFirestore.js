import { usersCollection } from "@/utils/constants/constants";
import { collection, db, doc, setDoc } from "@/utils/constants/firebase";
import { addDoc } from "firebase/firestore";

export async function createNewLink(uid, linkName, linkUrl) {
  const colRef = collection(db, usersCollection, uid, "links");
  return await addDoc(
    colRef,
    {
      link: linkUrl,
      social: linkName,
    },
    { merge: true }
  );
}

export async function updateLinksList(uid, linksList) {
  const colRef = collection(db, usersCollection, uid, "links");
  linksList.map(async (social) => {
    try {
      const res = await setDoc(colRef, {
        ...linksList,
      });
    } catch (e) {
      console.log(e.message);
    }
  });
}
