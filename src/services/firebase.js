import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: "live-chat-eb366.firebaseapp.com",
  projectId: "live-chat-eb366",
  storageBucket: "live-chat-eb366.appspot.com",
  messagingSenderId: "1017521657351",
  appId: "1:1017521657351:web:2ff32365a10d3a8fbafca2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
