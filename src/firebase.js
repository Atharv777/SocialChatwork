import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_ET5cQTjgrkcE8ei3yILqxBFHLG5azWY",
  authDomain: "social-chatwork.firebaseapp.com",
  projectId: "social-chatwork",
  storageBucket: "social-chatwork.appspot.com",
  messagingSenderId: "474967842576",
  appId: "1:474967842576:web:b3f5acc3c06d4397780f95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default app;
export {auth, provider, db}