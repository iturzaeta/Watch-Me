/* Spotify API Client config */
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: '3531ef1cad0e43f5b041255aa9c38066',
    clientSecret: '22ab1e554338461fac51a5a2d3756bd4'
  });
  
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      spotifyApi.setAccessToken(data.body.access_token);
    }, (err) => {
      console.log('Something went wrong when retrieving an access token', err);
    });
  
  /* Middlewares config */

 module.exports = spotifyApi