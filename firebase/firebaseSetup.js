// Firebase Imports
import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries
import { firebaseConfig } from './firebase';

// ERROR: No work
// const auth = getAuth(app);


let app = initializeApp(firebaseConfig)

const db = getFirestore(app);

export { db };

