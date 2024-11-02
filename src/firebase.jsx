// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCvMECkcFUJ7_BTPrZAtGYCb6IaAgtX_iw",
  authDomain: "chatapp-f66f5.firebaseapp.com",
  projectId: "chatapp-f66f5",
  storageBucket: "chatapp-f66f5.firebasestorage.app",
  messagingSenderId: "911328456019",
  appId: "1:911328456019:web:90386ca024b4009792c5a6",
  measurementId: "G-HJ48190W8V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);