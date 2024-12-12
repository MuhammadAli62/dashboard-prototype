// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAJ0-BNAuPhowL9tzyksax2mLdTzANfguM",
  authDomain: "private-chat-app-c479c.firebaseapp.com",
  projectId: "private-chat-app-c479c",
  storageBucket: "private-chat-app-c479c.appspot.com",
  messagingSenderId: "767448892364",
  appId: "1:767448892364:web:01752521955d52432e1369"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

