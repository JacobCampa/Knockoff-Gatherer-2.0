const router = require('express').Router();
const { cards, user } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const cardData = await cards.findAll({
      include: [
        {
          model: user,
          attributes: ['id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const cardInfo = cardData.map((card) => card.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('mainpage', { 
      cardInfo, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/cards/:id', async (req, res) => {
  try {
    const cardData = await cards.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ['id'],
        },
      ],
    });

    const cardInfo =cardData.get({ plain: true });

    res.render('collection', {
      ...cardInfo,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/mainpage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await user.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: cards }],
    });

    const userInfo = userData.get({ plain: true });

    res.render('mainpage', {
      ...userInfo,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/mainpage');
    return;
  }

  res.render('login');
});

module.exports = router;