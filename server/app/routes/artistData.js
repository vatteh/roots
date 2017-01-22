/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import request from 'request-promise-cache';
import Q from 'q';

import roviApiRequestService from '../roviApiRequestService';

let router = express.Router();

function getArtistSpotifyData(artistName) {
    let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist";
    return request({ url: url, cacheKey: artistName + '_getArtistSpotifyData'}).then(body => {
        return JSON.parse(body).artists.items[0];
    });
}

function getTopTracks(artistSpotifyID) {
    let url = "https://api.spotify.com/v1/artists/" + artistSpotifyID + "/top-tracks?country=US";
    return request({ url: url, cacheKey: artistSpotifyID + '_getTopTracks'}).then(body => {
        return JSON.parse(body).tracks;
    });
}

// Given a artistRoviID, artistName, & artistSpotifyID, return artist info, tracks, & bio
router.get('/', (req, res) => {
    Q.all([
        getArtistSpotifyData(req.query.artistName), 
        getTopTracks(req.query.artistSpotifyID), 
        roviApiRequestService.getArtistBio(req.query.artistRoviID)
    ]).then(data => {
        res.json({
            artistData: data[0],
            artistTopTracks: data[1],
            artistBio: data[2]
        });
    }).catch(() => {
        res.json(null);
    });
});

export default router;
