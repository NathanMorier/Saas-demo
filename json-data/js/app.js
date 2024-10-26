import { supabase } from './supabaseClient.js';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Use Supabase auth to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  });

  if (error) {
    document.getElementById('loginError').textContent = 'Invalid username or password.';
  } else {
    localStorage.setItem('username', username);
    window.location.href = 'dashboard.html';
  }
});
