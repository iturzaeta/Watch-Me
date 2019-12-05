const express = require('express');
const router = express.Router();
const upload = require('./config/cloudinary.config')
const homeController = require('./controllers/home.controller')
const usersController = require('./controllers/users.controller')

module.exports = router;


///////////////////////HOME//////////////////////////////

router.get('/', homeController.index);

/////////////////////USERS//////////////////////

router.get('/users/login', usersController.login);
router.get('/users/new', usersController.new);
router.post('/users', upload.single('avatar'), usersController.create);
router.get('/users/:token/validate',usersController.validate);


