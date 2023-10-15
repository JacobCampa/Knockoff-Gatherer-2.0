const router = require("express").Router();

const cardInfo = require("../../models");


// http://localhost:3001/api/deck-routes
router.get("/api/deck-routes", (req, res) => {
  res.render("login-routes");
});

module.exports = router;


// GET one card
router.get('/api/savedCards/:id', async (req, res) => {
    try {
      const cardData = await cardInfo.findByPk(req.params.id);
      if (!cardData) {
        res.status(404).json({ message: 'No card with this id!' });
        return;
      }
      res.status(200).json(cardData);
    } catch (err) {
      res.status(500).json(err);
    }
});


//GET all cards
router.get("/", async (req, res) => {
  try {
    const cards = await cardInfo.findAll({
      include: {
        model: cardInfo,
        attributes: ["card_name", "card_type", "rarity", "edition", "artist_name"],
      },
    });
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
  module.exports = router;