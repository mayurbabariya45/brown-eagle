import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBWPufkpoBVSbyfwu-xVuXPea5YZQJj3OY",
  authDomain: "tidal-solstice-186908.firebaseapp.com",
  databaseURL: "https://tidal-solstice-186908.firebaseio.com",
  projectId: "tidal-solstice-186908",
  storageBucket: "tidal-solstice-186908.appspot.com",
  messagingSenderId: "550325860803"
};
firebase.initializeApp(config);
export const Googleprovider = new firebase.auth.GoogleAuthProvider();
export const Facebookprovider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth;
export const database = firebase.database();
export default {
  database,
  firebase
};
