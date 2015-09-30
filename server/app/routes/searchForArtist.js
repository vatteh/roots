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
  var deferred = Q.defer();

  request("https://api.spotify.com/v1/search?q=" + artistName + "&type=artist", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var results = JSON.parse(body).artists.items;
      console.log("ARTIST SEARCH RESULT LENGTH: ", results.length);

      if (results.length === 0) {
        return deferred.reject();
      }
      
      //assuming the first search result is what we want for now
      var artistID = results[0].id;
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
      var results = JSON.parse(body).images;
      console.log("ARTIST INFO LENGTH: ", results.length);

      if (results.length === 0) {
        return deferred.reject();
      }

      var artistImageURL = results[0].url;

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
      var results = JSON.parse(body).tracks;
      console.log("ARTIST TOP TRACKS LENGTH: ", results.length);
      
      if (results.length === 0) {
        return deferred.reject();
      }

      var artistRandomTopTrack = results[Math.floor(Math.random() * results.length)];

      deferred.resolve(artistRandomTopTrack);
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
};

module.exports = router;