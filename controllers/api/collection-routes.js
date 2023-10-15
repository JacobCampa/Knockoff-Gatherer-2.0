const router = require('express').Router();
const User = require('../../models/User');

// GET one user
router.get('/user/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.render('collection', { Username: userData.Username });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.render('userData', userData);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
// PUT update a user
router.put('/user/:id', async (req, res) => {
    try {
      const userData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.render('userData', userData);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;