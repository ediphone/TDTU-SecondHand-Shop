// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC213kfBM4aZXYnzEqfg8Ay2MEvvSLKQnw",
  authDomain: "tdtusecondhandshop.firebaseapp.com",
  projectId: "tdtusecondhandshop",
  storageBucket: "tdtusecondhandshop.appspot.com",
  messagingSenderId: "788947322267",
  appId: "1:788947322267:web:f813ca07bac914c7b84d3e",
  measurementId: "G-BLVB32JR87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
