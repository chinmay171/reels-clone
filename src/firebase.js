import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import secret from "./secret";
// Initialize Firebase
const app = initializeApp(secret);
export let auth = getAuth(app);
export let db = getFirestore(app);