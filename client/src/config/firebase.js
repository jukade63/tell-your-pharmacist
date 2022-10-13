// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCrFGrtDhGuDQclPNTywZ7P0Hr4EE1ci4o",
  authDomain: "tell-your-pharmacist.firebaseapp.com",
  projectId: "tell-your-pharmacist",
  storageBucket: "tell-your-pharmacist.appspot.com",
  messagingSenderId: "81184409007",
  appId: "1:81184409007:web:fb69c50ddb05798d1e5b5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };