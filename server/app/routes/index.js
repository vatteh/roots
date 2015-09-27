'use strict';
var router = require('express').Router();
var request = require('request');
var async = require('async');

module.exports = router;

router.use('/members', require('./members'));
router.use('/artistInfluences', require('./artistInfluences'));

//searchForArtist

router.get('/searchForArtist/:artistName', function(req, res) {
	request("https://api.spotify.com/v1/search?q=" + req.params.artistName + "&type=artist", function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log("ARTIST SEARCH FIRST RESULT: ", JSON.parse(body).artists.items[0].id)
	    var artistId = JSON.parse(body).artists.items[0].id

	    //Take artistId and get artist images
	    request("https://api.spotify.com/v1/artists/" + artistId, function (error, response, body) {
	      if (!error && response.statusCode == 200) {
	        console.log("ARTIST INFO: ", JSON.parse(body))
	    	var artistImageURL = JSON.parse(body).images[0].url
    		
    		//Take artistId an get top tracks
    		request("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US", function (error, response, body) {
    		  if (!error && response.statusCode == 200) {
    		    console.log("ARTIST TOP TRACKS: ", JSON.parse(body))
    		    var artistFirstTopTrack = JSON.parse(body).tracks[0]
    				res.send({
    					artistId: artistId,
    					artistImageURL: artistImageURL,
    					artistFirstTopTrack: artistFirstTopTrack
    				})
    		  }
    		})
	      }
	    })
	  }
	})
});

// //getArtistInfo

// router.get('/getArtistInfo/:artistName', function(req, res) {
// 	request('http://charts.spotify.com/api/tracks/most_streamed/us/daily/latest', function (error, response, body) {
// 	  if (!error && response.statusCode == 200) {
// 	    //Do stuff
// 	  }
// 	})
// });

// //getArtistTopTrack

// router.get('/getArtistTopTrack', function(req, res) {
// 	request('http://charts.spotify.com/api/tracks/most_streamed/us/daily/latest', function (error, response, body) {
// 	  if (!error && response.statusCode == 200) {
// 	    //Do stuff
// 	  }
// 	})
// });

//Top Artists

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
	    	  	
	    	  	if(sixTopArtists.indexOf(parsedBody) === -1) {
		    	  	sixTopArtists.push(parsedBody);
	    	  	}
	    	  	
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
