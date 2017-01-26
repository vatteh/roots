/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import request from 'request-promise-cache';
import Q from 'q';

import utilsService from '../utilsService';

let router = express.Router();

function getTopTracks(artistSpotifyID) {
    let url = "https://api.spotify.com/v1/artists/" + artistSpotifyID + "/top-tracks?country=US";
    return request({ url: url, cacheKey: artistSpotifyID + '_getTopTracks'}).then(response => {
        var topTracks = JSON.parse(response.body).tracks;
        var pickedTracks = [];

        pickedTracks.push(utilsService.removeRandomElement(topTracks));
        pickedTracks.push(utilsService.removeRandomElement(topTracks));
        pickedTracks.push(utilsService.removeRandomElement(topTracks));

        return pickedTracks;
    });
}

// Given a artistRoviID, artistName, & artistSpotifyID, return artist info, tracks, & bio
router.get('/', (req, res) => {
    Q.all([
        utilsService.getArtistSpotifyData(req.query.artistName), 
        getTopTracks(req.query.artistSpotifyID), 
        utilsService.getArtistBio(req.query.artistRoviID)
    ]).then(data => {
        res.json({
            artistData: data[0],
            artistTopTracks: data[1],
            artistBio: data[2]
        });
    }).catch(error => {
        res.json(null);
    });
});

export default router;
