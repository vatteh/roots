/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import request from 'request-promise-cache';
import Q from 'q';

import utilsService from '../utilsService';

let router = express.Router();
let NUM_HOME_SCREEN_ARTISTS = 5;
let sampleArtists = [{
    "name": "Justin Bieber",
    "id": "MN0002165952",
    "spotifyId": "1uNFoZAHBGtllmzznpCI3s"
}, {
    "name": "The Black Keys",
    "id": "MN0000755918",
    "spotifyId": "7mnBLXK823vNxN3UWB7Gfz"
}, {
    "name": "One Direction",
    "id": "MN0002766592",
    "spotifyId": "4AK6F7OLvEQ5QYCBNiQWHq"
}, {
    "name": "Rihanna",
    "id": "MN0000367188",
    "spotifyId": "5pKCCKE2ajJHZ9KAiaK11H"
}, {
    "name": "The Weeknd",
    "id": "MN0002674162",
    "spotifyId": "1Xyo4u8uXC1ZmMpatF05PJ"
}, {
    "name": "Adele",
    "id": "MN0000503460",
    "spotifyId": "4dpARuHxo51G3z768sgnrY"
}, {
    "name": "Blake Shelton",
    "id": "MN0000046814",
    "spotifyId": "1UTPBmNbXNTittyMJrNkvw"
}, {
    "name": "Kendrick Lamar",
    "id": "MN0002709646",
    "spotifyId": "2YZyLoL8N0Wb9xBt1NhZWg"
}, {
    "name": "Ed Sheeran",
    "id": "MN0002639628",
    "spotifyId": "6eUKZXaKkcviH0Ku9w2n3V"
}, {
    "name": "Drake",
    "id": "MN0001035294",
    "spotifyId": "3TVXtAsR1Inumwj472S9r4"
}, {
    "name": "Calvin Harris",
    "id": "MN0000945951",
    "spotifyId": "7CajNmpbOovFoOoasH2HaY"
}];

function shuffleArray(array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

router.get('/', (req, res) => {
    let chosenArtists = [];
    let promises = [];
    shuffleArray(sampleArtists);
    for (let i = 0; i < NUM_HOME_SCREEN_ARTISTS; i++) {
        chosenArtists.push(sampleArtists[i]);

        let url = 'https://api.spotify.com/v1/artists/' + sampleArtists[i].spotifyId;
        promises.push(request({ url: url, cacheKey: sampleArtists[i].spotifyId + '_getTopPresentDayArtists'}));
    }

    Q.all(promises).then(data => {
        chosenArtists.forEach((artist, index) => {
            let images = JSON.parse(data[index].body).images;
            artist.spotifyThumbnail = utilsService.getThumbnailImage(images);
        });

        res.json(chosenArtists);
    }).catch(error => {
        console.log('Failed to get top present day artists', error);
        res.json(error);
    });
});


export default router;
