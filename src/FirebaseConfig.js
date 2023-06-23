// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import  {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv1WqosTSOrKZkdossodnRBWaA8wAXQ2g",
  authDomain: "imagegenerator-b0c91.firebaseapp.com",
  projectId: "imagegenerator-b0c91",
  storageBucket: "imagegenerator-b0c91.appspot.com",
  messagingSenderId: "813525711240",
  appId: "1:813525711240:web:2fbc58a6f9d6e00424223d",
  measurementId: "G-N0B646RKWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Auth = getAuth(app);
const Provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const API_TOKEN = "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";


export  {Auth, Provider, db, storage, app, API_TOKEN};