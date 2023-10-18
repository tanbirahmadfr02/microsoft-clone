/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCedgXusi_FLRSbfyuYmhTDp8hLDhzbEmU",
  authDomain: "clone-2e159.firebaseapp.com",
  projectId: "clone-2e159",
  storageBucket: "clone-2e159.appspot.com",
  messagingSenderId: "742234960801",
  appId: "1:742234960801:web:77b16ba229982e18c251e0",
  measurementId: "G-48SZE99V42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;