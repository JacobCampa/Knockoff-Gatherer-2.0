const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require ('bcrypt');

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET, // Use a secure, randomly generated secret
  cookie: {
    maxAge: 60000, // Session timeout after 1 minute
  },
  resave: false,
  saveUninitialized: true,
    db: sequelize,
};

app.use(session(sess));
app.use(flash());

app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in;
  res.locals.userId = req.session.user_id;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});