import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBFkEvH2m6ZQgOQY4n636eFmzr2j-wsyQ",
  authDomain: "expense-flow-3bbc3.firebaseapp.com",
  projectId: "expense-flow-3bbc3",
  storageBucket: "expense-flow-3bbc3.firebasestorage.app",
  messagingSenderId: "1048300764032",
  appId: "1:1048300764032:web:42acfb44b92cb8d8021f65",
  measurementId: "G-W77QLGR860",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);