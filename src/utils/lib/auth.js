import { useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
  signInWithEmailAndPassword,
  updateProfile,
} from "@/utils/constants/firebase";
import { usersCollection } from "../constants/constants";

export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function addProfileData(user, changes) {
  return updateProfile(user, changes);
}

export async function createFirestoreUser(uid, data) {
  return setDoc(doc(db, usersCollection, uid), {
    ...data,
  });
}

export async function checkUserStatus() {}
