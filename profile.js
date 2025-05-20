import { auth, firestore, storage } from './firebase.js';

// DOM Elements
const profileForm = document.getElementById('profile-form');
const photoUploadInput = document.getElementById('photo-upload');
const petNameInput = document.getElementById('pet-name');
const petBreedInput = document.getElementById('pet-breed');
const petKindInput = document.getElementById('pet-kind');
const profileImg = document.getElementById('profile-img');

// Save Profile Information
profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const user = auth.currentUser;
  if (!user) return;

  // Handle Image Upload
  const photoFile = photoUploadInput.files[0];
  if (photoFile) {
    const storageRef = storage.ref().child(`profile-pictures/${user.uid}`);
    const uploadTask = storageRef.put(photoFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.error('Error uploading photo:', error);
      },
      async () => {
        const photoURL = await uploadTask.snapshot.ref.getDownloadURL();
        saveProfileData(photoURL);
      }
    );
  } else {
    saveProfileData();  // If no photo uploaded, save without updating the photo
  }
});

// Save to Firestore
async function saveProfileData(photoURL = null) {
  const user = auth.currentUser;
  if (!user) return;

  const userData = {
    petName: petNameInput.value,
    petBreed: petBreedInput.value,
    petKind: petKindInput.value,
    photoURL: photoURL || '',  // If no new photo, use the current one or empty
  };

  const userDocRef = firestore.collection('users').doc(user.uid);
  await userDocRef.set(userData, { merge: true });

  // Update Profile Picture in the app
  profileImg.src = photoURL || user.photoURL || 'default-profile-pic.png';

  // Clear the form
  photoUploadInput.value = '';
  petNameInput.value = '';
  petBreedInput.value = '';
  petKindInput.value = '';
}

// Load User Profile Data
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userDocRef = firestore.collection('users').doc(user.uid);
    const doc = await userDocRef.get();

    if (doc.exists) {
      const userData = doc.data();
      profileImg.src = userData.photoURL || user.photoURL || 'default-profile-pic.png';
      petNameInput.value = userData.petName || '';
      petBreedInput.value = userData.petBreed || '';
      petKindInput.value = userData.petKind || '';
    } else {
      profileImg.src = user.photoURL || 'default-profile-pic.png';
    }
  }
});
