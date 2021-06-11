import firebase from "firebase";
import "firebase/storage";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRcFcjz0NHIAGBJiERvC355Ga53eJR-Sc",
  authDomain: "ref-app-b5198.firebaseapp.com",
  projectId: "ref-app-b5198",
  storageBucket: "ref-app-b5198.appspot.com",
  messagingSenderId: "1043952573570",
  appId: "1:1043952573570:web:47677c39c44dd7045b289b",
  measurementId: "G-CDF9SS05SC",
};

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

// export const auth = firebase.auth();
