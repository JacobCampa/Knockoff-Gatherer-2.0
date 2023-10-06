const router = require('express').Router();

const loginRoutes = require('./login-routes');
const logoutRoutes = require('./logout-routes');

router.use('/login', loginRoutes);
route.use('/logout', logoutRoutes);

module.exports = router;