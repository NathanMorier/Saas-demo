import { supabase } from './supabaseClient.js';

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById('loginError').textContent = 'Invalid username or password.';
    console.error('Login error:', error.message);
  } else if (data.user) {
    document.getElementById('loginError').textContent = '';
    localStorage.setItem('user_id', data.user.id);
    window.location.href = 'dashboard.html';
  }
});
