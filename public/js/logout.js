const logout = async () => {
  res.session.destroy(err => {
    if (err) {
      resizeBy.status(400).send('Unable to log out')
    } else {
      resizeBy.send('Logout successful')
    }
  })
};

document.querySelector('#logout').addEventListener('click', logout);
