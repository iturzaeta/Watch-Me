const User = require('../models/user.model')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use('google-auth', new GoogleStrategy({
   clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
   clientSecret:process.env.GOOGLE_AUTH_CLIENT_SECRET,
   callbackURL: process.env.GOOGLE_AUTH_CB || '/callback/google',
},authenticateOAuthUser))

function authenticateOAuthUser (accessToken, refreshToken, profile, next){
    
    User.findOne({[`social.${profile.provider.toLowerCase()}`]:profile.id})
        .then(user => {
            if(user){
                next(null,user)
            } 
            else {
                user = new User ({
                    name: profile.displayName,
                    avatar: profile._json ? profile._json.picture : profile.user.image_72,
                    username: profile.name.givenName,
                    email: profile.emails ? profile.emails[0].value : profile.user.mail,
                    validated: true,
                    password: profile.provider + Math.random().toString(36).substring(7),
                    social:{
                        [profile.provider.toLowerCase()]: profile.id
                    }
                })
                return user.save()
                    .then(user => {
                        next(null,user)
                    })
            }
        })
        .catch(error => next(error))
}       




module.exports = passport.initialize();