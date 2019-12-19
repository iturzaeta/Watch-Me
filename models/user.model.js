const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // params email
const SALT = 10; //bcrypt Salt Param

const tokenRandomGenerate = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true,'Name is required'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'This username already exists']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true,'This email has been used'],
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, 'Email is Invalid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8,'Password need at last 8 caracters']
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    validateToken: {
        type: String,
        unique: true,
        default: tokenRandomGenerate,
    },
    validated:{
        type: Boolean,
        default: false
    },
    social:{
        facebook: String,
        google: String,
        slack: String
    },
    favorite:
    {
        type: [String],
    }

    
}, {timestamps:true} )

userSchema.pre ('save', function(next){

    const user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(SALT)
            .then( salt => {
                return bcrypt.hash(user.password, salt) //generate hash
                .then(hash =>{
                    user.password = hash    // remplace user password
                    next()
                })
            })
            .catch(err => next(err))
            
    } else{
        next()
    }    
})

userSchema.methods.checkPassword = function (password){ //function compare password
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User',userSchema);

module.exports = User;