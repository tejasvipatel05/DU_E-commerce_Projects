import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// 🔹 Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDZxJGoO4JienjgDWFKyYeDS5ARrVMOqQM",
    authDomain: "ecommerce-101005.firebaseapp.com",
    projectId: "ecommerce-101005",
    storageBucket: "ecommerce-101005.firebasestorage.app",
    messagingSenderId: "690712974342",
    appId: "1:690712974342:web:0f991b9fc10fe7b1cbdf87",
    measurementId: "G-LG4T01D7YD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
