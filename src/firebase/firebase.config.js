// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCGDNVAjlJMGBgav_2AqEj9vPo66sfFBg",
  authDomain: "fir-fighter-69242.firebaseapp.com",
  projectId: "fir-fighter-69242",
  storageBucket: "fir-fighter-69242.firebasestorage.app",
  messagingSenderId: "211083980943",
  appId: "1:211083980943:web:ab573e4d8c5a57714500fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);