// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4bbASgf38du5MwW4L6aN9RLLankpcAj0",
  authDomain: "iat359-bitewise.firebaseapp.com",
  projectId: "iat359-bitewise",
  storageBucket: "iat359-bitewise.firebasestorage.app",
  messagingSenderId: "423144614749",
  appId: "1:423144614749:web:5457a32c9ea0190a7a56b4"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const firebase_db = getFirestore(firebase_app);