// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBYwrbUVBULCrhilRtvp7HqomzvGLx85aQ",
  authDomain: "dashboard-7a09d.firebaseapp.com",
  projectId: "dashboard-7a09d",
  storageBucket: "dashboard-7a09d.firebasestorage.app",
  messagingSenderId: "392178630072",
  appId: "1:392178630072:web:1c8a83c761c577c1cf234d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);