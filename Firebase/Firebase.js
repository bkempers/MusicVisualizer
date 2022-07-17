// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, inMemoryPersistence, setPersistence } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js"
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

/**
 * Firebase Login
 */
 const auth = getAuth(firebase);

 //Email Signin

 const emailSignInBtn = document.getElementById("emailSignInBtn");
 emailSignInBtn.onclick = () => {
  const emailAddress = document.getElementById("email").value;
  const emailPassword = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, emailAddress, emailPassword);
 }

 const emailRegisterBtn = document.getElementById("emailRegisterBtn");
 emailRegisterBtn.onclick = () => {
  const emailAddress = document.getElementById("email").value;
  const emailPassword = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, emailAddress, emailPassword);
 }

 const emailSignOutBtn = document.getElementById("emailSignOutBtn");
 emailSignOutBtn.onclick = () => auth.signOut();


//Google Signin
const provider = new GoogleAuthProvider();

const googleSignInBtn = document.getElementById("googleSignInBtn")
googleSignInBtn.onclick = () => signInWithPopup(auth, provider);

const googleSignOutBtn = document.getElementById("googleSignOutBtn")
googleSignOutBtn.onclick = () => auth.signOut();

  //Get currently signed-in user
  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);

        auth.setPersistence('local');

        document.querySelector("#emailSignInBtn").hidden = true;
        document.querySelector("#emailRegisterBtn").hidden = true;
        document.querySelector("#emailSignOutBtn").hidden = false;

        document.querySelector("#googleSignInBtn").hidden = true;
        document.querySelector("#googleSignOutBtn").hidden = false;

        document.querySelector("#display_name").innerHTML = user.displayName;
        document.querySelector("#email_address").innerHTML = user.email;
        // ...
      } else {
        // User is signed out
        // ...
        document.querySelector("#emailSignInBtn").hidden = false;
        document.querySelector("#emailRegisterBtn").hidden = false;
        document.querySelector("#emailSignOutBtn").hidden = true;

        document.querySelector("#googleSignInBtn").hidden = false;
        document.querySelector("#googleSignOutBtn").hidden = true;

        document.querySelector("#display_name").innerHTML = "";
        document.querySelector("#email_address").innerHTML = "";
      }
  });

//Email Signin
  //Sign up new user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  //Sign in existing user
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });