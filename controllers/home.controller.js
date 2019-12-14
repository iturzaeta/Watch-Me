const mongoose = require('mongoose')
const movieSearch = require('movie-trailer')
const imdb = require('imdb-api')
const spotifyApi = require('../config/spotify.config')




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
        
        movieSearch (`${data.title}`)
        .then(movie => {
            
            spotifyApi.searchPlaylists(`${data.title} OST`)
            .then((playlist) => {
               
                
                spotifyApi.getPlaylistTracks('4LswIBZodAFHvVudrCxJl8') ///cambiar esto
                .then(
                    function(tracks) {
                        res.send(tracks.body.items[0].track.preview_url);
                        //res.render('films/search',{movie: movie, data: data, playlist: playlist.body.playlists.items, tracks: tracks.body.items})
                },
                function(err) {
                  console.log('Something went wrong!', err);
                
               
            
               })
              });
            
        })
    })
    
    .catch((err)=>{
        res.redirect('/',{err:err})
    })
    
    
    
}