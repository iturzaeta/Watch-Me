const mongoose = require('mongoose')
const User = require('../models/user.model')


module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.new = (req, res, next) => {
    res.render('users/new')
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

}