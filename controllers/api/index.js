const router = require('express').Router();

const loginRoutes = require('./login-routes');
const logoutRoutes = require('./logout-routes');
const userRoutes = require('./user-routes');
const savedCards = require('./savedCards-routes');
const signupRoutes = require('./signup-routes');


router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/user', userRoutes);
router.use('/cards', savedCards);
router.use('/signup', signupRoutes);



module.exports = router;
