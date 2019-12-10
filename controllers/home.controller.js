const mongoose = require('mongoose')
const movieSearch = require('movie-trailer')
const imdb = require('imdb-api')


module.exports.index = (req, res, next) => {
    res.render('home')
}

// module.exports.search = (req, res, next) => {
//     res.render('films/search')
// }

module.exports.doSearch = (req, res, next) =>{
    const name = req.body.search

    imdb.get({name: `${name}`}, {apiKey: process.env.IMDB_ID})
    .then((data) => {
        
        movieSearch (`${name}`)
        .then(movie => {
            console.log(movie,data)
            res.render('films/search',{movie: movie, data: data})
        })
    })
    
    .catch((err)=>{
        res.redirect('/',{err:err})
    })
    
    
    
}