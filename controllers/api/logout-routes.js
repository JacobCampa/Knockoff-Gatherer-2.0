const router = require("express").Router();
// http://localhost:3001/login/api/login-routes
router.get("/api/login-routes", (req, res) => {
  res.render("login");
});

module.exports = router;