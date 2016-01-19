'use strict';
/* global module, console, require */
var router = require('express').Router();
var mongoose = require('mongoose');
var requestPromise = require('request-promise');
var _ = require('underscore');
var Q = require('q');

router.get('/', function(req, res) {
    topSpotifyTracks().then(function(topTracks) {
        res.json(filter(topTracks));
    })
    .catch(function(error) {
        console.log('Failed to get top Spotify tracks');
        res.json(error);
    });
});

router.get('/artistData', function(req, res) {    
    var artists = JSON.parse(req.query.artists);
    var promises = [];

    for (var i = 0; i < artists.length; i++) {
        var artistId = getArtistIdFromSpotifyURI(artists[i].artist_url);
        promises.push(requestPromise('https://api.spotify.com/v1/artists/' + artistId));
    }

    Q.all(promises).then(function(topArtists) {
        var topArtistsJSON = topArtists.map(function(elm) {
            return JSON.parse(elm);
        });

        res.json(topArtistsJSON);
    })
    .catch(function(error) {
        console.log('Failed to get Spotify artist data');
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
}

function getArtistIdFromSpotifyURI(spotifyURI) {
    return spotifyURI.slice(32);
}

// returns only unique artists in topTracks list 
function filter(topTracks) {
    var hash = {};

    for (var i = 0; i < topTracks.length; i++) {
        if (hash[topTracks[i].artist_name] === undefined) {
            hash[topTracks[i].artist_name] = _.pick(topTracks[i], 'artist_name', 'artist_url');
        }
    }

    return _.values(hash);
}

module.exports = router;
