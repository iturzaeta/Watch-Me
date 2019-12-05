const express = require('express');
const router = express.Router();
const upload = require('./config/cloudinary.config')
const homeController = require('./controllers/home.controller')
const usersController = require('./controllers/users.controller')
const passport = require ('passport')

module.exports = router;


///////////////////////HOME//////////////////////////////

router.get('/', homeController.index);

/////////////////////USERS//////////////////////

router.get('/users/login', usersController.login);
//router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login'}), usersController.doLogin);
router.get('/users/new', usersController.new);
router.post('/users', upload.single('avatar'), usersController.create);
router.get('/users/:token/validate',usersController.validate);

/////////////////////SOCIAL LOGIN////////////////////////////////
router.post('/google', passport.authenticate('google-auth', {scope:['openid','profile','email'] }))
router.get('/callback/:provider',usersController.doSocialLogin)

