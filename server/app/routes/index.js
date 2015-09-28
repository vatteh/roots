'use strict';
var router = require('express').Router();
var request = require('request');

module.exports = router;

router.use('/artistInfluences', require('./artistInfluences.js'));
router.use('/searchForArtist', require('./searchForArtist.js'));
router.use('/topSpotifyArtists', require('./topSpotifyArtists.js'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
  res.status(404).end();
});