import { auth, GoogleAuthProvider, signInWithPopup } from './firebase.js';

// DOM Elements
const welcomePopup = document.getElementById('welcome-popup');
const continueBtn = document.getElementById('continue-btn');
const authScreen = document.getElementById('auth-screen');
const appScreen = document.getElementById('app');

// Show welcome popup on first visit
if (!localStorage.getItem('visited')) {
  welcomePopup.style.display = 'flex';
  localStorage.setItem('visited', 'true');
}

continueBtn.addEventListener('click', () => {
  welcomePopup.style.display = 'none';
  authScreen.classList.remove('hidden');
});

// Auth Providers
const googleLoginBtn = document.getElementById('google-login');
const facebookLoginBtn = document.getElementById('facebook-login');

googleLoginBtn.addEventListener('click', () => signInWithGoogle());

// Google Sign-In with reCAPTCHA check
function signInWithGoogle() {
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA before signing in.");
    return;
  }

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      // Optional: reset the reCAPTCHA if needed
      grecaptcha.reset();
      showApp();
    })
    .catch(console.error);
}

function showApp() {
  authScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
  loadUserData();
}

// Check if user is already logged in
auth.onAuthStateChanged(user => {
  if (user) showApp();
});

const petForm = document.getElementById('pet-form');
const petsList = document.getElementById('pets-list');

petForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const petName = document.getElementById('pet-name').value;
  const petBreed = document.getElementById('pet-breed').value;

  // Save to Firestore
  db.collection('pets').add({
    name: petName,
    breed: petBreed,
    userId: auth.currentUser.uid
  }).then(() => {
    petForm.reset();
    loadPets();
  });
});

function loadPets() {
  petsList.innerHTML = '';
  db.collection('pets')
    .where('userId', '==', auth.currentUser.uid)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const pet = doc.data();
        petsList.innerHTML += `
          <div class="pet-card">
            <h3>${pet.name}</h3>
            <p>${pet.breed}</p>
          </div>
        `;
      });
    });
}

const citySearch = document.getElementById('city-search');
const resultsDiv = document.getElementById('results');

citySearch.addEventListener('input', (e) => {
  const city = e.target.value.trim();
  if (city.length < 3) return;

  // Mock data - replace with Firestore query later
  const mockVets = [
    {
    name: "The Cochin Pet Hospital",
    address: "Kochi, Kerala",
    phone: "0484 232 2177",
    verified: false
  },
  {
    name: "Felican Pet Hospital",
    address: "Kochi, Kerala",
    phone: "099619 33999",
    verified: false
  },
  {
    name: "Dr Zoo Pet Hospital",
    address: "Ernakulam, Kerala",
    phone: "091691 64446",
    verified: false
  },
  {
    name: "Ernakulam Pet Hospital - Cochin",
    address: "Kochi, Kerala",
    phone: "0484 357 2498",
    verified: false
  },
  {
    name: "PET TRUST - Veterinary Hospital",
    address: "Kakkanad, Kerala",
    phone: "062358 06115",
    verified: false
  },
  {
    name: "District Veterinary Centre Ernakulam",
    address: "Ernakulam, Kerala",
    phone: "0484 235 1264",
    verified: false
  },
  {
    name: "BLUVET PET HOSPITAL | Pet Hospital Dog Grooming Clinic Kochi",
    address: "Ernakulam, Kerala",
    phone: "077363 62822",
    verified: false
  },
  {
    name: "Veterinary doctor Kochi, Home visit and online consultation",
    address: "Ernakulam, Kerala",
    phone: "",
    verified: false
  },
  {
    name: "Government Veterinary dispensary Vennala",
    address: "Ernakulam, Kerala",
    phone: "",
    verified: false
  },
  {
    name: "Dr. Pramuda Devi",
    address: "Kochi, Kerala",
    phone: "094473 29924",
    verified: false
  }
  ];

  resultsDiv.innerHTML = mockVets.map(vet => `
    <div class="vet-card">
      <h3>${vet.name}</h3>
      <p>${vet.address}</p>
      <a href="https://maps.google.com?q=${encodeURIComponent(vet.address)}" target="_blank">
        Open in Maps
      </a>
      <button class="claim-btn" data-vet="${vet.name}">Claim Listing</button>
    </div>
  `).join('');
});
