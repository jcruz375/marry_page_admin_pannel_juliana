import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCxBxokPiKbfy57sINI_qkEZI9uWEOgx2M",
  authDomain: "juliana-marriage-page.firebaseapp.com",
  projectId: "juliana-marriage-page",
  storageBucket: "juliana-marriage-page.appspot.com",
  messagingSenderId: "781253637764",
  appId: "1:781253637764:web:1f594a59d8537200b7f4d1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);