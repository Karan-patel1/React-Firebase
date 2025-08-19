// src/firebase.js

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBIWkCS-iX24PuJO6GKyUNw9pc7n3EKm5k",
  authDomain: "fir-project-8d2f8.firebaseapp.com",
  projectId: "fir-project-8d2f8",
  storageBucket: "fir-project-8d2f8.firebasestorage.app",
  messagingSenderId: "901962237673",
  appId: "1:901962237673:web:3dd7d162d5bd4762209278",
databaseURL: "https://fir-project-8d2f8-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
const database = getDatabase(app);

// Export needed functions
export { database, ref, set, onValue };
