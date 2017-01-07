/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import requestPromise from 'request-promise';
import _ from 'lodash';
import Q from 'q';

let router = express.Router();

function topSpotifyTracks() {
    return requestPromise('http://charts.spotify.com/api/tracks/most_streamed/us/daily/latest').then(body => {
        let topTracks = JSON.parse(body).tracks;

        topTracks.sort(() => {
            return 0.5 - Math.random();
        });

        return topTracks;
    });
}

function getArtistIdFromSpotifyURI(spotifyURI) {
    return spotifyURI.slice(32);
}

// returns only unique artists in topTracks list 
function filter(topTracks) {
    let hash = {};

    for (let i = 0; i < topTracks.length; i++) {
        if (hash[topTracks[i].artist_name] === undefined) {
            hash[topTracks[i].artist_name] = _.pick(topTracks[i], 'artist_name', 'artist_url');
        }
    }

    return _.values(hash);
}

router.get('/', (req, res) => {
    topSpotifyTracks().then(topTracks => {
        res.json(filter(topTracks));
    }).catch(error => {
        console.log('Failed to get top Spotify tracks');
        res.json(error);
    });
});

router.get('/artistData', (req, res) => {    
    let artists = JSON.parse(req.query.artists);
    let promises = [];

    for (let i = 0; i < artists.length; i++) {
        let artistId = getArtistIdFromSpotifyURI(artists[i].artist_url);
        promises.push(requestPromise('https://api.spotify.com/v1/artists/' + artistId));
    }

    Q.all(promises).then(topArtists => {
        let topArtistsJSON = topArtists.map(element => {
            return JSON.parse(element);
        });

        res.json(topArtistsJSON);
    }).catch(error => {
        console.log('Failed to get Spotify artist data');
        res.json(error);
    });
});


export default router;
