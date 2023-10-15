//requirements
const express = require('express');
const router = require('express').Router();
const flash = require("express-flash");
const { UserInfo } = require('../../models/UserInfo');


router.use(flash());
//gets the login handlebars
// http://localhost:3001/login/api/login-routes
router.get("/api/login-routes", (req, res) => {
  res.render('login');
});


router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("message") });
});


//Logs in user
router.post("/api/login/routes", async (req, res) => {
  try {
    // Check if a user with the same email already exists
    const { email, password } = req.body;
    const user = await UserInfo.findOne({ where: { email } });
//If the user's pawword doesn't line up, it will populate "Invalid credentials"
    if (!user || !user.checkPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
//If the user and password match, it will populate "Loggin Successful"
    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.flash("message", "Login successful");
    //Redirects to main page but logged in
    return res.redirect('/main');
  } catch (error) {
    //If there is an err in this process, show login failed. 
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});



module.exports = router;