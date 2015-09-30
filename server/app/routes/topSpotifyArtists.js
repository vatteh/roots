'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var requestPromise = require('request-promise');
var async = require('async');
var _ = require('underscore');
var Q = require('q');

//Top Artists
router.get('/', function(req, res) {
  topSpotifyTracks().then(function(topTracks) {
    var topTracks = filter(topTracks, 10);
    var promises = [];

    for (var i = 0; i < topTracks.length; i++) {
      var artistId = getArtistIdFromSpotifyURI(topTracks[i].artist_url);
      promises.push(requestPromise('https://api.spotify.com/v1/artists/' + artistId));
    }

    return Q.all(promises);
  }).then(function(topArtists) {

  	var topArtistsJSON = topArtists.map(function(elm) {
  		return JSON.parse(elm);
  	});

  	res.json(topArtistsJSON);
  }).catch(function(error) {
    console.log('Failed to make a Spotify request');
    res.json(error);
  });
});

function topSpotifyTracks() {
  return requestPromise('http://charts.spotify.com/api/tracks/most_streamed/us/daily/latest').then(function(body) {
    var topTracks = JSON.parse(body).tracks;

    topTracks.sort(function() {
      return 0.5 - Math.random();
    });

    return topTracks;
  });
};

function getArtistIdFromSpotifyURI(spotifyURI) {
  return spotifyURI.slice(32);
};

function filter(topTracks, limit) {
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