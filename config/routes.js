const express = require('express');
const router = express.Router();
const upload = require('./cloudinary.config')
const homeController = require('../controllers/home.controller')
const usersController = require('../controllers/users.controller')
const passport = require ('passport')

///////////////////////HOME//////////////////////////////
router.get('/', homeController.index);
//router.get('/films/search', homeController.search)
router.post('/films/search', homeController.doSearch)

/////////////////////USERS//////////////////////
router.get('/users/new', usersController.new);
router.post('/users', upload.single('avatar'), usersController.create);
router.get('/users/:token/validate',usersController.validate);

//////////////////////////LOGIN//////////////////////////////////
router.get('/users/login', usersController.login);
router.post('/users/login', usersController.doLogin);
router.post('/logout', usersController.logout);

/////////////////////SOCIAL LOGIN////////////////////////////////
router.post('/google', passport.authenticate('google-auth', {scope:['openid','profile','email'] }))
router.get('/callback/:provider',usersController.doSocialLogin)

//////////////////// USER PAGE //////////////////////////////////
router.get('/users/:username', usersController.profile)
router.get('/users/:username/edit',usersController.edit)
router.post('/users/:username/update',upload.single('avatar'),usersController.doEdit)
router.post('/users/:username/delete',usersController.delete)
// Falta ruta post a añadir favoritos

///////////////////LIKE//////////////////////////////////////
router.post('/like', homeController.like)


module.exports = router;