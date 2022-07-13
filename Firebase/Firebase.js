// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
import { } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js"
import { } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa9dYDWoEpEvTCSR_W6N4nkg94vm0iD-M",
  authDomain: "customizable-music-visualizer.firebaseapp.com",
  projectId: "customizable-music-visualizer",
  storageBucket: "customizable-music-visualizer.appspot.com",
  messagingSenderId: "656185894511",
  appId: "1:656185894511:web:df96b78d8fcc3938bbcf9a",
  measurementId: "G-PJBSSR5H91"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default {firebase, analytics};