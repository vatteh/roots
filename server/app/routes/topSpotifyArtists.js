/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import requestPromise from 'request-promise';
import Q from 'q';

let router = express.Router();
let NUM_HOME_SCREEN_ARTISTS = 5;
let sampleArtists = [{
    "artist_name": "Steve Aoki",
    "artist_id": "77AiFEVeAVj2ORpC85QVJs"
}, {
    "artist_name": "Justin Bieber",
    "artist_id": "1uNFoZAHBGtllmzznpCI3s"
}, {
    "artist_name": "The Black Keys",
    "artist_id": "7mnBLXK823vNxN3UWB7Gfz"
}, {
    "artist_name": "One Direction",
    "artist_id": "4AK6F7OLvEQ5QYCBNiQWHq"
}, {
    "artist_name": "Rihanna",
    "artist_id": "5pKCCKE2ajJHZ9KAiaK11H"
}, {
    "artist_name": "The Weeknd",
    "artist_id": "1Xyo4u8uXC1ZmMpatF05PJ"
}, {
    "artist_name": "Adele",
    "artist_id": "4dpARuHxo51G3z768sgnrY"
}, {
    "artist_name": "Blake Shelton",
    "artist_id": "1UTPBmNbXNTittyMJrNkvw"
}, {
    "artist_name": "Kendrick Lamar",
    "artist_id": "2YZyLoL8N0Wb9xBt1NhZWg"
}, {
    "artist_name": "Ed Sheeran",
    "artist_id": "6eUKZXaKkcviH0Ku9w2n3V"
}, {
    "artist_name": "Drake",
    "artist_id": "3TVXtAsR1Inumwj472S9r4"
}, {
    "artist_name": "Calvin Harris",
    "artist_id": "7CajNmpbOovFoOoasH2HaY"
}];

function shuffleArray(array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

router.get('/', (req, res) => {
    let promises = [];
    shuffleArray(sampleArtists);

    for (let i = 0; i < NUM_HOME_SCREEN_ARTISTS; i++) {
        promises.push(requestPromise('https://api.spotify.com/v1/artists/' + sampleArtists[i].artist_id));
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
