import { auth, firestore } from './firebase.js';

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
    const userDocRef = firestore.collection('users').doc(user.uid);
    const doc = await userDocRef.get();

    if (doc.exists) {
      const userData = doc.data();
      profileImg.src = userData.photoURL || user.photoURL || 'default-profile-pic.png';
    } else {
      profileImg.src = user.photoURL || 'default-profile-pic.png';
    }
  }
});
