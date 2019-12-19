const mongoose = require('mongoose')
const movieSearch = require('movie-trailer')
const imdb = require('imdb-api')
const spotifyApi = require('../config/spotify.config')
const User = require('../models/user.model')


module.exports.index = (req, res, next) => {
    res.render('home')
}

// module.exports.search = (req, res, next) => {
//     res.render('films/search')
// }

const previewUrl = ({ track }) => track.preview_url

const getPreview = ({ body }) =>
    body.items
        .filter(previewUrl)
        .map(previewUrl)

const apiManager = data => movie => ({
    getInfo: ({ playlists }) => _ => ({ data, movie, playlist: playlists.items }),
    tracks: ({ id }) => spotifyApi.getPlaylistTracks(`${id}`),
    playlists: _ => spotifyApi.searchPlaylists(`${data.title} OST`)
})

module.exports.doSearch = (req, res, _) =>{
    const { search } = req.body
    let manager = null
    let getAllInfo = null
    imdb.get({name: search}, {apiKey: process.env.IMDB_ID})
        .then(data => {
            console.log("DATA => ", data)
            manager = apiManager(data)            
            return movieSearch (`${data.title}`)
        })
        .then(movie => {
            console.log(movie)
            manager = manager(movie)
            return manager.playlists()
        })
        .then(({ body }) => {
            //res.send(body.playlists.items[0].tracks)
            getAllInfo = manager.getInfo(body)
            return manager.tracks(body.playlists.items[0])
        })
        .then(getPreview)
        .then(tracks => 
            res.render('films/movieDetail', {...getAllInfo(), tracks}))
            //res.send(tracks))
            

        .catch(err => {
            console.info('Something went wrong! => ', err)
            res.redirect('/', { err })
        })
}

module.exports.favourite = (req, res, next) => {
    const id = req.currentUser._id

    User.findById(id)
    .then(user =>{
        if(!user.favorite.includes(req.params.id)){
            User.findByIdAndUpdate(id, {
                $push: { favorite: req.params.id }
            }, {
                new: true
            })
             .then(user => {
                user.save()
                console.log(user)
            })
        } else {
            console.log('ya la tiene', user)
        }
    })
    .catch(error => next(error))
}   


