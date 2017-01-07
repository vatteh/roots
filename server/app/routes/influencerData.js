/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import requestPromise from 'request-promise';
import Q from 'q';

let router = express.Router();

function getArtistID(artistName) {
    return requestPromise("https://api.spotify.com/v1/search?q=" + artistName + "&type=artist").then(body => {
        let results = JSON.parse(body).artists.items;

        if (results.length === 0) {
            throw new Error('No artist ID found!');
        }

        // assuming the first search result is what we want for now
        let artistID = results[0].id;
        return artistID;
    });
}

function getArtistInfo(artistID) {
    //Take artistId and get artist images
    return requestPromise("https://api.spotify.com/v1/artists/" + artistID).then(body => {
        let results = JSON.parse(body).images;

        if (results.length === 0) {
            throw new Error('No artist info found!');
        }

        let artistImageURL = results[0].url;
        return artistImageURL;
    });
}

function getTopTracks(artistID) {
    //Take artistID an get top tracks
    return requestPromise("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US").then(body => {
        let results = JSON.parse(body).tracks;
        // console.log("ARTIST TOP TRACKS LENGTH: ", results.length);

        if (results.length === 0) {
            throw new Error('No artist tracks found!');
        }

        let artistRandomTopTrack = results[Math.floor(Math.random() * results.length)];
        return artistRandomTopTrack;
    });
}

// Given a name, search Spotify for Artist Info
router.get('/:artistName', (req, res) => {
    let artistID;

    getArtistID(req.params.artistName).then(id => {
        artistID = id;
        return Q.all([getArtistInfo(artistID), getTopTracks(artistID)]);
    }).then(data => {
        res.json({
            artistId: artistID,
            artistImageURL: data[0],
            artistFirstTopTrack: data[1]
        });
    }, () => {
        res.json(null);
    });
});

export default router;
