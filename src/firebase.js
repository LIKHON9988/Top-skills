// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace these with your ACTUAL Firebase config values
// Get these from Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
  apiKey: "AIzaSyCaH14f71K2VG4ajQG4iJmYucmQUa-gSi4",
  authDomain: "assign-ment-09.firebaseapp.com",
  projectId: "assign-ment-09",
  storageBucket: "assign-ment-09.firebasestorage.app",
  messagingSenderId: "93374929313",
  appId: "1:93374929313:web:d8e23f8855d962bb1cd3e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { auth, googleProvider };
export default app;
