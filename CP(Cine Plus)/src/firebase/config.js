// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/app" 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMdngLF6-Os2eFg0O0o3ytSMX9NdUe_SY",
  authDomain: "cp-cineplus.firebaseapp.com",
  projectId: "cp-cineplus",
  storageBucket: "cp-cineplus.appspot.com",
  messagingSenderId: "198409333987",
  appId: "1:198409333987:web:77f13fe6392733dfae29d6",
  measurementId: "G-MTX425WZKV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth()
const firebaseStorage = getStorage(firebaseApp);

const analytics = getAnalytics(firebaseApp);

export {firebaseApp, auth, firebaseStorage, analytics}