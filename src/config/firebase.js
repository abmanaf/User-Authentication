import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQTv_D0fcJMSw4beLYqelvN4v2rvN2kR8",
  authDomain: "fir-project-a0624.firebaseapp.com",
  projectId: "fir-project-a0624",
  storageBucket: "fir-project-a0624.appspot.com",
  messagingSenderId: "169144889978",
  appId: "1:169144889978:web:6997efac0b5088731441c3",
  measurementId: "G-0LX0S4XSV7",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
