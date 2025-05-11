// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries
import { firebaseConfig } from './firebase';

let app = initializeApp(firebaseConfig)

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };

