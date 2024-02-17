import { usersCollection } from "@/utils/constants/constants";
import { collection, db, doc, setDoc } from "@/utils/constants/firebase";
import { addDoc } from "firebase/firestore";

export async function createNewLink(uid) {
  const colRef = collection(db, usersCollection, uid, "links");
  return await addDoc(
    colRef,
    {
      test: "success",
    },
    { merge: true }
  );
}
