import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBDOJVDLLEiMWRlHrj_bJVXyuyNf1BKrRc",
    authDomain: "loginscreen-2df21.firebaseapp.com",
    projectId: "loginscreen-2df21",
    storageBucket: "loginscreen-2df21.appspot.com",
    messagingSenderId: "548851551612",
    appId: "1:548851551612:web:bfa71383a3db01f6bea8f9"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

export default {fire, db, storage};
  