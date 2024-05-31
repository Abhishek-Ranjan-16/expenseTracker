// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAErUodZoqF0zfu2xgFWQt_gaM3C3cLQE4",
  authDomain: "expense-tracker-6f514.firebaseapp.com",
  projectId: "expense-tracker-6f514",
  storageBucket: "expense-tracker-6f514.appspot.com",
  messagingSenderId: "666589135408",
  appId: "1:666589135408:web:f6e427eca5b981ada5e3f5",
  measurementId: "G-KZ13ZYWXRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore()
