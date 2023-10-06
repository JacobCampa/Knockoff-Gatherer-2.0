const router = require('express').Router();

const loginRoutes = require('./login-routes');
const logoutRoutes = require('./logout-routes');
const userRoutes = require('./user-routes')

router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/user', userRoutes);

module.exports = router;