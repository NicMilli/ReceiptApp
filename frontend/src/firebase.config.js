// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqo4SVq1KRroDJVpGJIHchL7EgQ_ooryE",
  authDomain: "receiptapp-d19c6.firebaseapp.com",
  projectId: "receiptapp-d19c6",
  storageBucket: "receiptapp-d19c6.appspot.com",
  messagingSenderId: "1012742181460",
  appId: "1:1012742181460:web:5956bb6888785ba941d3c1",
  measurementId: "G-YBNSTXR3T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();