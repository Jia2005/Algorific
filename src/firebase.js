import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBeOiDZCy55EHnxrNi36N5L48i3vEvKBIg",
  authDomain: "algorific-1f68a.firebaseapp.com",
  projectId: "algorific-1f68a",
  storageBucket: "algorific-1f68a.appspot.com",
  messagingSenderId: "717783134698",
  appId: "1:717783134698:web:f5d0b3e86ad9a3bbae0293",
  measurementId: "G-LX5X7552K9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, collection, doc, setDoc, addDoc };
