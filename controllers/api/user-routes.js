const router = require('express').Router();
const User = require('../../models/UserInfo');

// GET one user
router.get('/user/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      // res.render('userData', userData);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    // res.render('userData', userData);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});


  
  module.exports = router;