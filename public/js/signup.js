const signupFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // Check if the required fields are not empty
    if (username && email && password) {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('User registered successfully');
        document.location.replace('/main');
      } else {
        alert('Failed to sign up.');
      }
    } else {
      // Handle case where required fields are empty
      alert('Please fill in all required fields.');
    }
};
  
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
  