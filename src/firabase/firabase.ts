import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdlZQyobMyOYIvSdkjW-pJifVCNF_KT6g",
  authDomain: "firestore-app-380ad.firebaseapp.com",
  projectId: "firestore-app-380ad",
  storageBucket: "firestore-app-380ad.appspot.com",
  messagingSenderId: "437476168488",
  appId: "1:437476168488:web:c8d1c2782026ec4e05f61d",
  measurementId: "G-21CK6PBBQS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
