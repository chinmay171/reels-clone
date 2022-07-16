import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDelW_WP2PIq_obKcpVhdkCLNZ4-2sT7UE",
  authDomain: "reels-app-f2f44.firebaseapp.com",
  projectId: "reels-app-f2f44",
  storageBucket: "reels-app-f2f44.appspot.com",
  messagingSenderId: "514668148970",
  appId: "1:514668148970:web:016dd7dd420b92fe637f93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let auth = getAuth(app);