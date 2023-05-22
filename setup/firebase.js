// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdOx6duFoepc30IjeUspPrvuW2gDQij4w",
  authDomain: "funky-tronics.firebaseapp.com",
  projectId: "funky-tronics",
  storageBucket: "funky-tronics.appspot.com",
  messagingSenderId: "798995017533",
  appId: "1:798995017533:web:a9899b07ea1d37259bdf54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);