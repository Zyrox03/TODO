const express = require('express')
const route = express.Router({ mergeParams: true })

const userController = require('../controllers/user')
const passport = require('passport');


route.get('/register', userController.renderRegister);

route.get('/login', userController.renderLogin);

route.post('/register', userController.registerUser);

route.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), userController.loginUser);


route.get('/logout', userController.logoutUser);


module.exports = route
