import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC4Vts0cZZR7cvzK2m5Bu_auMovkQ2lIzE",
  authDomain: "image-slideshow-preview.firebaseapp.com",
  databaseURL: "https://image-slideshow-preview.firebaseio.com",
  projectId: "image-slideshow-preview",
  storageBucket: "image-slideshow-preview.appspot.com",
  messagingSenderId: "512658355863",
  appId: "1:512658355863:web:a6a8fb232da6f818a21bd2",
  measurementId: "G-NNW5GY1G22",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
  storage: firebase.storage(),
};
