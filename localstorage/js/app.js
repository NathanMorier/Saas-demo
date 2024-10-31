document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'test' && password === 'password123') {
    // Store the username in local storage
    localStorage.setItem('username', username);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').textContent = 'Invalid username or password.';
  }
});
