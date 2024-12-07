// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEQgwOYuXgrYbAgQzMWhN21A08N9wibko",
  authDomain: "espresso-emporium-82acb.firebaseapp.com",
  projectId: "espresso-emporium-82acb",
  storageBucket: "espresso-emporium-82acb.firebasestorage.app",
  messagingSenderId: "477903461148",
  appId: "1:477903461148:web:26cba333bf4beead9178d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
