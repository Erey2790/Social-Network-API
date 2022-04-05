const router = require('express').Router();
const UserRoutes = require('./user-routes');

// add prefix of `/user` to routes created in `pizza-routes.js`
router.use('/user', UserRoutes);

module.exports = router;