const mongoose = require ('mongoose')
const MONGODB_URL = process.env.MONGO_URI

mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
    .then(()=> console.info("Conection success"))
    .catch(err => console.error("error to connect",err))

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('force disconnect to BD')
        process.exit(0)
    })
})