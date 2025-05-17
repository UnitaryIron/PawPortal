import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJGVLPl7IejViBCeQlMpX7cDxLAl393gc",
  authDomain: "pawportal-f48fb.firebaseapp.com",
  projectId: "pawportal-f48fb",
  storageBucket: "pawportal-f48fb.firebasestorage.app",
  messagingSenderId: "814709145521",
  appId: "1:814709145521:web:e4631109bdbd734b2cc790",
  measurementId: "G-607EM7MPP2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };