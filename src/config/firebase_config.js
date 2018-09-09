import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAKDSJ4z1INeuPpSn8ZFugaVyatSYCQv-A",
  authDomain: "brown-eagle.firebaseapp.com",
  databaseURL: "https://brown-eagle.firebaseio.com",
  projectId: "brown-eagle",
  storageBucket: "brown-eagle.appspot.com",
  messagingSenderId: "199988999675"
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
