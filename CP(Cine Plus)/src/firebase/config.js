// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcqkFiZ01slSkc2UVg_nQRwv49zQD_S8Q",
  authDomain: "cineplus-b9a8f.firebaseapp.com",
  projectId: "cineplus-b9a8f",
  storageBucket: "cineplus-b9a8f.appspot.com",
  messagingSenderId: "1076575442183",
  appId: "1:1076575442183:web:ffb66210558b327b15a1a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}