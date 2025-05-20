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

// Google Sign-In with reCAPTCHA check
googleLoginBtn.addEventListener('click', () => signInWithGoogle());

// Google Sign-In Function
function signInWithGoogle() {
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA before signing in.");
    return;
  }

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Optional: reset the reCAPTCHA if needed
      grecaptcha.reset();

      // User is signed in, store user information
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));  // Save user data to localStorage

      // Redirect to the dashboard after successful login
      window.location.href = 'app.html';
    })
    .catch((error) => {
      console.error("Error signing in: ", error.message);
    });
}

// Check if user is already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    // If a user is already logged in, redirect to the dashboard page
    window.location.href = 'app.html';
  }
});
