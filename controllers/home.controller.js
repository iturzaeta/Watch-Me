const mongoose = require('mongoose')
const movieSearch = require('movie-trailer')


module.exports.index = (req, res, next) => {
    res.render('home')
}

// module.exports.search = (req, res, next) => {
//     res.render('films/search')
// }

module.exports.doSearch = (req, res, next) =>{
    const name = req.body.search
    
    movieSearch (`${name}`)
    .then(movie => {
        console.log(movie)
        res.render('films/search',{movie: movie})
    })
    .catch((err)=>{
        res.redirect('/',{err:err})
    })
    
    
    
}