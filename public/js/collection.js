app.get('/', (req, res) => {
    res.render('home', { username: userData.username, cards: cardData });
  });