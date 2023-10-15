const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("express-flash");
const bcrypt = require("bcrypt");

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 60000, // Session timeout after 1 minute
  },
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore(),
};

app.use(session(sess));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in;
  res.locals.userId = req.session.user_id;
  next();
});

app.use(routes);

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("mainpage", { layout: "main" });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "main" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { layout: "main" });
});

app.get("/searchengine", (req, res) => {
  res.render("searchengine", { layout: "main" });
});

app.get("/collection", (req, res) => {
  res.render("collection", { layout: "main" });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
