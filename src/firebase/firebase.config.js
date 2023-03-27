// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvcoX3ucWHk4MSHMf4OjdAEJ8GXwqwXfM",
    authDomain: "teacher-profile-bd2c7.firebaseapp.com",
    projectId: "teacher-profile-bd2c7",
    storageBucket: "teacher-profile-bd2c7.appspot.com",
    messagingSenderId: "101672401543",
    appId: "1:101672401543:web:b4f44e099f0a844bd01622"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app