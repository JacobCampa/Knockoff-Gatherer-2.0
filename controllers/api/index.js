//requires express's router docs
const router = require('express').Router();

//requires all api routes
const loginRoutes = require('./login-routes');
const userRoutes = require('./user-routes');
const savedCards = require('./savedCards-routes');
const signupRoutes = require('./signup-routes');

//tells router how to use the above api routes in the path
router.use('/login', loginRoutes);
router.use('/users', userRoutes);
router.use('/cards', savedCards);
router.use('/signup', signupRoutes);


module.exports = router;
