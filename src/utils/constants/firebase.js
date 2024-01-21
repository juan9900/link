// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9DPqgjR7HCp0ISP-SNu5YrscKdA6idAo",
  authDomain: "linkhub-1a56f.firebaseapp.com",
  projectId: "linkhub-1a56f",
  storageBucket: "linkhub-1a56f.appspot.com",
  messagingSenderId: "339797420493",
  appId: "1:339797420493:web:661e720ca29f64e1b37c84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  setDoc,
  getDoc,
  getDocs,
  doc,
  collection,
};
