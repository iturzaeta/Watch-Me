const express = require('express');
const router = express.Router();
//const upload = require('./cloudinary/config')
const homeController = require('./controllers/home.controller')
const usersController = require('./controllers/users.controller')

module.exports = router;

router.get('/', homeController.index);
router.get('/users/login', usersController.login);
router.get('/users/new', usersController.new);

router.post('/user/new', usersController.create);


