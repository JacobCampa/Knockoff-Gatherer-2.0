const router = require("express").Router();
// http://localhost:3001/api/deck-routes
router.get("/api/deck-routes", (req, res) => {
  res.render("login-routes");
});

module.exports = router;


// GET one card
router.get('/:id', async (req, res) => {
    try {
      const cardData = await User.findByPk(req.params.id);
      if (!cardData) {
        res.status(404).json({ message: 'No card with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// POST create a new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
// PUT update a user
router.put('/:id', async (req, res) => {
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
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;