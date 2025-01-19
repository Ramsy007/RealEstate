// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "real-estate-4f2b8.firebaseapp.com",
  projectId: "real-estate-4f2b8",
  storageBucket: "real-estate-4f2b8.firebasestorage.app",
  messagingSenderId: "24269874682",
  appId: "1:24269874682:web:f0080675fdcc014c21b043"
}; 

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);