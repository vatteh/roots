'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var async = require('async');
var _ = require('underscore');
var Q = require('q');

//Top Artists
router.get('/', function(req, res) {

	topSpotifyTracks().then(function(topTracks) {
		var topTracks = filter(topTracks, 10);
		var topArtists = [];

		function updateSixTopArtistsArray(track, callback) {
		  var artistId = getArtistIdFromSpotifyURI(track.artist_url);
		  request('https://api.spotify.com/v1/artists/' + artistId, function(error, response, body) {
		    if (!error && response.statusCode == 200) {
		      var parsedBody = JSON.parse(body);

		      if (topArtists.indexOf(parsedBody) === -1) {
		        topArtists.push(parsedBody);
		      }

		      callback();
		    }
		  })
		};

		//Loop through artist array and make request for each artist from Spotify
		async.each(topTracks, updateSixTopArtistsArray, function(err) {
		  if (err) {
		    // One of the iterations produced an error.
		    // All processing will now stop.
		    console.log('Failed to make a Spotify request');
		  } else {
		    //Return array of artists
		    res.json(topArtists);
		  }
		});
	});
});

function topSpotifyTracks() {
  var deferred = Q.defer();

  request('http://charts.spotify.com/api/tracks/most_streamed/us/daily/latest', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var topTracks = JSON.parse(body).tracks;
      //Grab six random artists from the top tracks
      topTracks.sort(function() {
        return 0.5 - Math.random();
      });

      deferred.resolve(topTracks);
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
};

function getArtistIdFromSpotifyURI(spotifyURI) {
  var shortenedSpotifyURI = spotifyURI.slice(32);
  return shortenedSpotifyURI;
};

function filter(topTracks, limit) {
	var maxSize = limit || topTracks.length;
	var hash = {};

	var i = 0;
	var size = 0;

	while (i < topTracks.length && size < limit) {
		if (hash[topTracks[i].artist_name] === undefined) {
		  hash[topTracks[i].artist_name] = topTracks[i];
		  size++;
		}

		i++;
	}

	return _.values(hash);
};

module.exports = router;