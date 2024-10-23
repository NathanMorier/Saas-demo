import { supabase } from './supabaseClient.js';

const signUpForm = document.getElementById('signupForm');
signUpForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Sign-up Error:', error.message);
      document.getElementById('signupError').textContent = error.message;
    } else {
      console.log('User signed up successfully:', data);
      window.location.href = 'index.html'; // Redirect to login or another page after success
    }
  } catch (err) {
    console.error('Unexpected error during sign-up:', err);
    document.getElementById('signupError').textContent = 'An unexpected error occurred. Please try again later.';
  }
});
