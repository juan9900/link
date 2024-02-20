import { usersCollection } from "@/utils/constants/constants";
import { collection, db, doc, setDoc } from "@/utils/constants/firebase";
import {
  addDoc,
  getCountFromServer,
  query,
  where,
  runTransaction,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export async function createNewLink(uid, linkName, linkUrl) {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(
      docRef,
      {
        links: arrayUnion({
          link: linkUrl,
          social: linkName,
        }),
      },
      { merge: true }
    );
  } catch (e) {
    console.log(e.message);
  }
  // try {
  //   const colRef = collection(db, usersCollection, uid, "links");
  //   const snapshot = await getCountFromServer(colRef);
  //   console.log(`Count: ${snapshot.data().count}`);
  //   return await addDoc(
  //     colRef,
  //     {
  //       link: linkUrl,
  //       social: linkName,
  //       index: snapshot.data().count + 1,
  //     },
  //     { merge: true }
  //   );
  // } catch (e) {
  //   console.log(e.message);
  // }
}

export async function updateLinksList(uid, newOrder, activeId, overId) {
  console.log("updating");
  console.log({ newOrder: newOrder });

  const userDocRef = doc(db, "users", uid);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      if (!userDoc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(userDocRef, { links: newOrder }, { merge: true });
    });
    console.log("Transaction successfully committed!");
  } catch (error) {
    console.error("Transaction failed:", error);
  }
  //Set the moved link's id
}
