const router = require("express").Router();
// http://localhost:3001/login/api/logout-routes
router.get("/api/logout-routes", (req, res) => {
  res.render("login-routes");
});

module.exports = router;