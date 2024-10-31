import { supabase } from './supabaseClient.js';

document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { user, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    document.getElementById('signupError').textContent = error.message;
    console.error('Signup error:', error.message);
  } else {
    document.getElementById('signupError').textContent = '';
    document.getElementById('signupMessage').textContent = 'Registration successful! Check your email to verify your account.';

    // Optionally store the username in a 'users' table
    await supabase.from('users').insert([{ id: user.id, username }]);
  }
});
