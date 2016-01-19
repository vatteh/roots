'use strict';
/* global module, console, require */
var router = require('express').Router();
var mongoose = require('mongoose');
var requestPromise = require('request-promise');
var Q = require('q');

// Given a name, search Spotify for Artist Info
router.get('/:artistName', function(req, res) {
    var artistID;

    getArtistID(req.params.artistName).then(function(id) {
        artistID = id;
        return Q.all([getArtistInfo(artistID), getTopTracks(artistID)]);
    }).then(function(data) {
        res.json({
            artistId: artistID,
            artistImageURL: data[0],
            artistFirstTopTrack: data[1]
        });
    }, function() {
        res.json(null);
    });
});

function getArtistID(artistName) {
    return requestPromise("https://api.spotify.com/v1/search?q=" + artistName + "&type=artist").then(function(body) {
        var results = JSON.parse(body).artists.items;
        // console.log("ARTIST SEARCH RESULT LENGTH: ", results.length);

        if (results.length === 0) {
            throw new Error('No artist ID found!');
        }

        //assuming the first search result is what we want for now
        var artistID = results[0].id;
        return artistID;
    });
}

function getArtistInfo(artistID) {
    //Take artistId and get artist images
    return requestPromise("https://api.spotify.com/v1/artists/" + artistID).then(function(body) {
        var results = JSON.parse(body).images;
        // console.log("ARTIST INFO LENGTH: ", results.length);

        if (results.length === 0) {
            throw new Error('No artist info found!');
        }

        var artistImageURL = results[0].url;
        return artistImageURL;
    });
}

function getTopTracks(artistID) {
    //Take artistID an get top tracks
    return requestPromise("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US").then(function(body) {
        var results = JSON.parse(body).tracks;
        // console.log("ARTIST TOP TRACKS LENGTH: ", results.length);

        if (results.length === 0) {
            throw new Error('No artist tracks found!');
        }

        var artistRandomTopTrack = results[Math.floor(Math.random() * results.length)];
        return artistRandomTopTrack;
    });
}

module.exports = router;
