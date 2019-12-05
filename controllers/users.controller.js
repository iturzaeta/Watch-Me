const mongoose = require('mongoose')
const User = require('../models/user.model')


module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.new = (req, res, next) => {
    res.render('users/new', {user: new User()})
}

module.exports.create =(req,res,next) => {
    const user = new User ({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.file ? req.file.url : undefined, //cloudinare URL
        bio: req.body.bio
    })
    
    console.log(user)
    user.save()
        .then((user) => {
            //email
            res.redirect('/users/login')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('users/new', { user, error: error.errors })
            } else if (error.code === 11000) {
              res.render('users/new', {
                user: {
                  ...user,
                  password: null
                },
                genericError: 'User exists'
              })
            } else {
              next(error);
            }
          })

}