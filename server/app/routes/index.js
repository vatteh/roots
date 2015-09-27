'use strict';
var router = require('express').Router();
var request = require('request');
var async = require('async');

module.exports = router;

router.use('/members', require('./members'));
router.use('/artistInfluences', require('./artistInfluences'));

router.get('/top-artists', function(req, res) {
	request('http://charts.spotify.com/api/tracks/most_streamed/us/daily/latest', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var topTracks = JSON.parse(body).tracks
	    //Grab six random artists from the top tracks
	    topTracks.sort(function() {
	    	return 0.5 - Math.random()
	    })

	    var sixTopTracks = [];

	    for (var i = 0; i < 30; i++) {
	    	sixTopTracks.push(topTracks[i])
	    }

	    //Loop through artist array and make request for each artist from Spotify

	    function getArtistIdFromSpotifyURI(spotifyURI) {
	    	var shortenedSpotifyURI = spotifyURI.slice(32)
	    	return shortenedSpotifyURI
	    }

	    var sixTopArtists = [];

	    function updateSixTopArtistsArray(track, callback) {
	    	var artistId = getArtistIdFromSpotifyURI(track.artist_url)
	    	request('https://api.spotify.com/v1/artists/' + artistId, function (error, response, body) {
	    	  if (!error && response.statusCode == 200) {
	    	  	var parsedBody = JSON.parse(body);
	    	  	sixTopArtists.push(parsedBody);
	    	  	callback();
	    	  }
	    	})
	    }

	    async.each(sixTopTracks, updateSixTopArtistsArray, function(err) {
	    	if( err ) {
    	    	// One of the iterations produced an error.
    	    	// All processing will now stop.
    	    	console.log('Failed to make a Spotify request');
	    	} else {
    	    	//Return array of artists
    	    	console.log(sixTopArtists);
    	    	res.json(sixTopArtists);
	    	}
	    })
	  }
	})
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
