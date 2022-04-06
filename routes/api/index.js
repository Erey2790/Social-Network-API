const router = require('express').Router();
const UserRoutes = require('./user-routes');
const ThoughtRoutes = require('./thought-routes')

// add prefix of `/user` to routes created in `user-routes.js`
router.use('/user', UserRoutes);
router.use('/thought', ThoughtRoutes)

module.exports = router;