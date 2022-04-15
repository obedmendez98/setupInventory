// import * as firebase from "firebase";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";


// Estos datos se obtienen de la consola de Firebase
// en la configuracion del proyecto "Firebase SDK snippet"

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBGVGwtqw3fNpB2uCxInW_84jInDAUQbmI",
  authDomain: "nonn-dcf56.firebaseapp.com",
  projectId: "nonn-dcf56",
  storageBucket: "nonn-dcf56.appspot.com",
  messagingSenderId: "92979884213",
  appId: "1:92979884213:web:9ad56e5915c9609d194efc",
  measurementId: "G-GTB3G8PSNT"
});



export default firebaseConfig;
