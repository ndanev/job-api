const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../../controllers/users');

/* @route /api/users/register */
router.post('/register', userController.register);

/* @route /api/users/login */
router.post('/login', userController.login);

/* @route /api/users/profile */
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.profile);

module.exports = router;