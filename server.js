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

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//Serves static files (we need it to import a css file)
app.use(express.static('public'))
//Sets a basic route
app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('mainpage', {layout : 'main'});
    });
    app.get('/login', (req, res) => {
      //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
      res.render('login', {layout : 'main'});
      });
  
  app.get ('/signup', (req, res) => {
      res.render('signup', {layout: 'main'})
  });
  app.get ('/searchengine', (req, res) => {
    res.render('searchengine', {layout: 'main'})
});
app.get ('/collection', (req, res) => {
  res.render('collection', {layout: 'main'})
});
    
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});




