import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC_2AAG_cAYxUQnjhFjOZgMlLKBeKBPtaI",
  authDomain: "elitmus-537f5.firebaseapp.com",
  databaseURL: "https://elitmus-537f5-default-rtdb.firebaseio.com",
  projectId: "elitmus-537f5",
  storageBucket: "elitmus-537f5.appspot.com",
  messagingSenderId: "73293097159",
  appId: "1:73293097159:web:c5e250709ecbe3f3f2b6e2",
  measurementId: "G-VCR57X1VD9"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getDatabase(app);
