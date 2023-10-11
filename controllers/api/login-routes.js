const express = require('express');
const router = require('express').Router();
const flash = require("express-flash");
const { UserInfo } = require('../../models/UserInfo');


router.use(flash());

// http://localhost:3001/login/api/login-routes
router.get("/api/login-routes", (req, res) => {
  res.render('login');
});


router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("message") });
});



router.post("/api/login/routes", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserInfo.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.flash("message", "Login successful");
    return res.redirect('/main');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});



module.exports = router;