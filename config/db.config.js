const mongoose = require ('mongoose')
const MONGODB_URL = 'mongodb://heroku_kqzx4slh:u2vcgqkf4o8ric570q7o3152mn@ds257668.mlab.com:57668/heroku_kqzx4slh'

mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
    .then(()=> console.info("Conection success"))
    .catch(err => console.error("error to connect",err))

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('force disconnect to BD')
        process.exit(0)
    })
})