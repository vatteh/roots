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
    let sampleArtists = [{
        "artist_name": "Nick Jonas",
        "artist_url": "https://play.spotify.com/artist/4Rxn7Im3LGfyRkY2FlHhWi"
    }, {
        "artist_name": "Blake Shelton",
        "artist_url": "https://play.spotify.com/artist/1UTPBmNbXNTittyMJrNkvw"
    }, {
        "artist_name": "Kendrick Lamar",
        "artist_url": "https://play.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
    }, {
        "artist_name": "Ed Sheeran",
        "artist_url": "https://play.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V"
    }, {
        "artist_name": "I LOVE MAKONNEN",
        "artist_url": "https://play.spotify.com/artist/3aGFCoR8xGN6DKwvdzeSja"
    }, {
        "artist_name": "Drake",
        "artist_url": "https://play.spotify.com/artist/3TVXtAsR1Inumwj472S9r4"
    }, {
        "artist_name": "Rae Sremmurd",
        "artist_url": "https://play.spotify.com/artist/7iZtZyCzp3LItcw1wtPI3D"
    }, {
        "artist_name": "Pitbull",
        "artist_url": "https://play.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
    }, {
        "artist_name": "Maroon 5",
        "artist_url": "https://play.spotify.com/artist/04gDigrS5kc9YWfZHwBETP"
    }, {
        "artist_name": "Calvin Harris",
        "artist_url": "https://play.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
    }];

    res.json(sampleArtists);
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
