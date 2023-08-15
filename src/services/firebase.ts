import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyASEh7Akql0m-IAxG-oe1rKZPIeI8KTB6s",
  authDomain: "marry-invite-page.firebaseapp.com",
  projectId: "marry-invite-page",
  storageBucket: "marry-invite-page.appspot.com",
  messagingSenderId: "110536542869",
  appId: "1:110536542869:web:b3ec3b92806d92689ae99c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);