// Import necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyDJGVLPl7IejViBCeQlMpX7cDxLAl393gc",
  authDomain: "pawportal-f48fb.firebaseapp.com",
  projectId: "pawportal-f48fb",
  storageBucket: "pawportal-f48fb.firebasestorage.app",
  messagingSenderId: "814709145521",
  appId: "1:814709145521:web:e4631109bdbd734b2cc790",
  measurementId: "G-607EM7MPP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services
export { auth, firestore, storage };
