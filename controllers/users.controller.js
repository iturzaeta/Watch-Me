const mongoose = require('mongoose')
const User = require('../models/user.model')
const email = require('../config/mail.config')
const passport = require('passport');


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
            email.sendValidateEmail(user)
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

module.exports.validate = ( req, res, next ) =>{
    User.findOne({ validateToken:req.params.token })
    .then((user) => {
        if(user.validated){ //Check Validated and redirect
            res.send(`<h1>This Email has been Validated</h1>
            <script>setTimeout(function (){
                window.location = '/users/login'
            },2000)</script>`)
            
        } else {
        user.validated = true;
        user.save()
        .then(() =>{
            res.redirect('/')
        })}
    })
    .catch(err => {console.log(err)})
}

module.exports.doSocialLogin = (req , res, next )=>{
  const socialProvider = req.params.provider

  passport.authenticate(`${socialProvider}-auth`, (error,user)=>{
    if(error){
      next(error)
    }else{
      req.session.user = user
      res.redirect('/')
    }
  })(req,res,next)

}

