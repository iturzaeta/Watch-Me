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
            res.render('films/search', {...getAllInfo(), tracks}))
            //res.send(tracks))
            

        .catch(err => {
            console.info('Something went wrong! => ', err)
            res.redirect('/', { err })
        })
}

module.exports.like = (req, res, next) => {
    console.log("DATA => ", data)
}