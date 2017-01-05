'use strict';
/* global module, console, require */
var router = require('express').Router();
var roviApiRequestService = require('../roviApiRequestService');

router.get('/:artistName', function(req, res) {
    roviApiRequestService.getArtistInfluences(req.params.artistName).then(function(artist) {
        res.json(artist);
    }).catch(function(error) {
        res.json(error);
    });
});

module.exports = router;
