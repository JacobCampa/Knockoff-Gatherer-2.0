const path = require("path");
const express = require("express"); // Imports express
const exphbs = require("express-handlebars"); // Imports handlebars
const session = require("express-session"); // Imports express-session
const bcrypt = require("bcrypt"); // Imports bcrypt

const routes = require("./controllers"); // Imports all routes
const sequelize = require("./config/connection"); // Connects to the database

const app = express();
const PORT = process.env.PORT || 3001; // http://localhost:3001

// Manages user's session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 600000, // Session timeout after 10 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore(),
};

app.use(session(sess)); // Use the session middleware before any other middlewares


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Uses public folder

// Checks login credentials
app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in;
  res.locals.userId = req.session.user_id;
  next();
});

app.use(routes); // Uses all routes

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Gets main page
app.get("/", (req, res) => {
  res.render("mainpage", { layout: "main" });
});

// Gets login page
app.get("/login", (req, res) => {
  res.render("login", { layout: "main" });
});

// Gets signup page
app.get("/signup", (req, res) => {
  res.render("signup", { layout: "main" });
});

// Gets search engine page
app.get("/searchengine", (req, res) => {
  res.render("searchengine", { layout: "main" });
});

// Gets collection page
app.get("/collection", (req, res) => {
  res.render("collection", { layout: "main" });
});

// Syncs database 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
