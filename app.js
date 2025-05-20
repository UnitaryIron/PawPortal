import { auth, firestore } from './firebase.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js'; // Import Firestore functions

// DOM Elements
const profileBtn = document.getElementById('profile-btn');
const profileImg = document.getElementById('profile-img');

// Redirect to Profile Page
profileBtn.addEventListener('click', () => {
  window.location.href = 'profile.html';  // Redirect to profile page
});

// Check if user is signed in and load profile picture
auth.onAuthStateChanged(async (user) => {
  if (user) {
    try {
      // Use the correct Firestore method to get a document reference
      const userDocRef = doc(firestore, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        profileImg.src = userData.photoURL || user.photoURL || 'default-profile-pic.png';
      } else {
        profileImg.src = user.photoURL || 'default-profile-pic.png';
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
});
