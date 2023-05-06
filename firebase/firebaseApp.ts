// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiCx-wfS53xaQ-slhXrqwPmTo67dXgCNg",
  authDomain: "monthend-pragi.firebaseapp.com",
  projectId: "monthend-pragi",
  storageBucket: "monthend-pragi.appspot.com",
  messagingSenderId: "700717529260",
  appId: "1:700717529260:web:21a2a9d04a4e010e31c709"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export function to initilize firebase
export const initFirebase = () => {
    return app;
}