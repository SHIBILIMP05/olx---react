import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhgPqabmkKpPoExtsjn1n00ktnaY8j-kU",
  authDomain: "olx-clone-c80a8.firebaseapp.com",
  projectId: "olx-clone-c80a8",
  storageBucket: "olx-clone-c80a8.appspot.com",
  messagingSenderId: "242142064866",
  appId: "1:242142064866:web:3b15f31d0e49ea3a1f6ebb",
  measurementId: "G-CZC97LFH5Z"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const fireStore = getFirestore(firebaseApp)
const firebaseStorage = getStorage(firebaseApp)
export { firebaseApp, auth, fireStore, firebaseStorage }