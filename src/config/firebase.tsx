// Import the functions you need from the SDKs you need
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCnTYefibwaasmHAPVpTHQwJMkjopno5lc",
  authDomain: "easymenu-befe0.firebaseapp.com",
  databaseURL: "https://easymenu-befe0-default-rtdb.firebaseio.com",
  projectId: "easymenu-befe0",
  storageBucket: "easymenu-befe0.appspot.com",
  messagingSenderId: "490497266061",
  appId: "1:490497266061:web:5d40cdbd2a234766b8edc4",
  measurementId: "G-N78QGR2DY5"
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
export const appFirebase = firebase.initializeApp(firebaseConfig);