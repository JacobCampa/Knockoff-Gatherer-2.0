const signupFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const fname = document.querySelector('#fname').value.trim();
    const lname = document.querySelector('#lname').value.trim();
    const username = document.querySelector('#newUsername').value.trim();
    const email = document.querySelector('#newEmail').value.trim();
    const password = document.querySelector('#newPassword').value.trim();
  
    // Check if the required fields are not empty
    if (fname && lname && username && email && password) {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ fname, lname, username, email, password }),
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
  