/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import Q from 'q';

import utilsService from '../utilsService';

function fetchArtistData(influencers, maxLength) {
    let selectedInfluencers = [];
    while (selectedInfluencers.length < maxLength && influencers.length) {
        selectedInfluencers.push(utilsService.removeRandomElement(influencers));
    }

    let promises = [];
    selectedInfluencers.forEach(artist => {
        promises.push(utilsService.searchArtistSpotifyData(artist.name));
    });

    return { promises: promises, selectedInfluencers: selectedInfluencers };
}

function filterSelectedInfluencers(selectedInfluencers, spotifyData) {
    return selectedInfluencers.map((artist, index) => {
        if (spotifyData[index].state === 'fulfilled' && spotifyData[index].value && spotifyData[index].value.images.length) {
            artist.spotifyThumbnail = utilsService.getThumbnailImage(spotifyData[index].value.images);
            artist.spotifyId = spotifyData[index].value.id;
            return artist;
        }

        return null;
    }).filter(artist => {
        return artist;
    });
}

let router = express.Router();
router.get('/:artistRoviID', (req, res) => {
    utilsService.getArtistInfluencers(req.params.artistRoviID).then(influencers => {
        let finalSelectedInfluencers = [];
        let artistData = fetchArtistData(influencers, 5);
        function getArtistSpotifyData(promises) {
            Q.allSettled(promises).then(spotifyData => {
                finalSelectedInfluencers = finalSelectedInfluencers.concat(filterSelectedInfluencers(artistData.selectedInfluencers, spotifyData));
                if (finalSelectedInfluencers.length < 5 && influencers.length) {
                    artistData = fetchArtistData(influencers, 5 - finalSelectedInfluencers.length);
                    getArtistSpotifyData(artistData.promises);
                } else {
                    res.json(finalSelectedInfluencers);
                }
            });
        }

        getArtistSpotifyData(artistData.promises);
    }).catch(error => {
        console.log('Error getting artist influencers', error);
        res.json(error);
    });
});

export default router;
