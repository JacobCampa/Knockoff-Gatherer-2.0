const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log('Form submission initiated');
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('User registered successfully');
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


  const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      const logoutMessage = document.createElement('p');
      logoutMessage.textContent = 'Successfully logged out!';
      document.body.appendChild(logoutMessage);
      setTimeout(() => {
        logoutMessage.style.display = 'none';
        document.location.replace('/');
    }, 3000);
    } else {
      alert('Failed to log out.');
    }
  };
  
  document
    .querySelector('#logout')
    .addEventListener('click', logout);
  