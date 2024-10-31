import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Clear any previous messages
    document.getElementById('signupError').textContent = '';
    document.getElementById('signupMessage').textContent = '';

    // Check if passwords match
    if (password !== confirmPassword) {
      document.getElementById('signupError').textContent = "Passwords do not match. Please try again.";
      return;
    }

    // Proceed with Supabase signup if passwords match
    const { user, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      document.getElementById('signupError').textContent = error.message;
      console.error('Signup error:', error.message);
    } else {
      document.getElementById('signupMessage').textContent = 'Registration successful! Check your email to verify your account.';
      document.getElementById('signupForm').reset();
    }
  });
});
