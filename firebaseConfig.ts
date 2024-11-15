// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyBi6Ora6FdJFYRzEPx_YejysUcgVbp9BZA",
//   authDomain: "pantry-party-f8d92.firebaseapp.com",
//   projectId: "pantry-party-f8d92",
//   storageBucket: "pantry-party-f8d92.appspot.com",
//   messagingSenderId: "573281549973",
//   appId: "1:573281549973:web:492e41fb27167c2d93259c",
//   measurementId: "G-YFSTWV5KCE",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBvWHAYGj3BFdAqstC2a08SWMApsqJgL3k",
  authDomain: "pantry-party2.firebaseapp.com",
  projectId: "pantry-party2",
  storageBucket: "pantry-party2.appspot.com",
  messagingSenderId: "140288374383",
  appId: "1:140288374383:web:9144e71aab62f0caaeff9a",
  measurementId: "G-66LKGHV5KR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);