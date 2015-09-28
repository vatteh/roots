'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var Q = require('q');

// Given a name, search Spotify for Artist Info
router.get('/:artistName', function(req, res) {
  var artistID;

  getArtistID(req.params.artistName).then(function(id) {
    artistID = id;
    return Q.all([getArtistInfo(artistID), getTopTracks(artistID)]);
  }).then(function(data) {
    res.send({
      artistId: artistID,
      artistImageURL: data[0],
      artistFirstTopTrack: data[1]
    });
  });
});

function getArtistID(artistName) {
  var deferred = Q.defer();

  request("https://api.spotify.com/v1/search?q=" + artistName + "&type=artist", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log("ARTIST SEARCH FIRST RESULT: ", JSON.parse(body).artists.items[0].id)
      
      //assuming the first search result is what we want for now
      var artistID = JSON.parse(body).artists.items[0].id;

      deferred.resolve(artistID);
    } else {
      deferred.reject(error); 
    }
  });

  return deferred.promise;
};

function getArtistInfo(artistID) {
  var deferred = Q.defer();

  //Take artistId and get artist images
  request("https://api.spotify.com/v1/artists/" + artistID, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log("ARTIST INFO: ", JSON.parse(body))
      var artistImageURL = JSON.parse(body).images[0].url;

      deferred.resolve(artistImageURL);
    } else {
      deferred.reject(error); 
    }
  })

  return deferred.promise;
};

function getTopTracks(artistID) {
  var deferred = Q.defer();

  //Take artistID an get top tracks
  request("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log("ARTIST TOP TRACKS: ", JSON.parse(body));
      
      var artistFirstTopTrack = JSON.parse(body).tracks[0];

      deferred.resolve(artistFirstTopTrack);
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
};

module.exports = router;