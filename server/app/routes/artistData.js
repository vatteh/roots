/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import Q from 'q';

import utilsService from '../utilsService';

let router = express.Router();

function getTopTracks(spotifyID) {
    let url = "https://api.spotify.com/v1/artists/" + spotifyID + "/top-tracks?country=US";
    let cacheKey = spotifyID + '_getTopTracks';
    return utilsService.makeAuthorizedSpotifyCall(url, cacheKey).then(response => {
        let topTracks = JSON.parse(response.body).tracks.filter(track => track.preview_url);

        let pickedTracks = [];
        for (let i = 0; i < 3; i++) {
            if (topTracks.length) {
                pickedTracks.push(utilsService.removeRandomElement(topTracks));
            }
        }

        return pickedTracks.map(track => {
            return {
                id: track.id,
                name: track.name,
                previewUrl: track.preview_url,
                popularity: track.popularity,
                albumName: track.album.name,
                image: track.album.images.pop()
            };
        });
    });
}

// Given a roviID, name, & spotifyID, return artist info, tracks, & bio
router.get('/', (req, res) => {
    Q.all([
        utilsService.searchArtistSpotifyData(req.query.name),
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
