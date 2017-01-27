/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import request from 'request-promise-cache';
import Q from 'q';

import utilsService from '../utilsService';

let router = express.Router();

function getTopTracks(spotifyID) {
    let url = "https://api.spotify.com/v1/artists/" + spotifyID + "/top-tracks?country=US";
    return request({ url: url, cacheKey: spotifyID + '_getTopTracks'}).then(response => {
        var topTracks = JSON.parse(response.body).tracks;
        var pickedTracks = [];

        pickedTracks.push(utilsService.removeRandomElement(topTracks));
        pickedTracks.push(utilsService.removeRandomElement(topTracks));
        pickedTracks.push(utilsService.removeRandomElement(topTracks));

        return pickedTracks;
    });
}

// Given a roviID, name, & spotifyID, return artist info, tracks, & bio
router.get('/', (req, res) => {
    Q.all([
        utilsService.getArtistSpotifyData(req.query.name), 
        getTopTracks(req.query.spotifyID), 
        utilsService.getArtistBio(req.query.roviID)
    ]).then(data => {
        res.json({
            data: data[0],
            topTracks: data[1],
            bio: data[2]
        });
    }).catch(error => {
        console.log('Could not get artist data');
        res.json(error);
    });
});

export default router;
