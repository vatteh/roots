/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import Q from 'q';

import utilsService from '../utilsService';

let router = express.Router();
router.get('/:artistRoviID', (req, res) => {
    let influencers;
    let selectedInfluencers = [];
    utilsService.getArtistInfluencers(req.params.artistRoviID).then(data => {
        influencers = data;
        while (selectedInfluencers.length < 5 && influencers.length) {
            selectedInfluencers.push(utilsService.removeRandomElement(influencers));
        }

        let promises = [];
        selectedInfluencers.forEach(artist => {
            promises.push(utilsService.getArtistSpotifyData(artist.name));
        });

        return Q.allSettled(promises);
    }).then(data => {
        let filteredSelectedInfluencers = selectedInfluencers.map((artist, index) => {
            if (data[index].state === 'fulfilled' && data[index].value && data[index].value.images.length) {
                artist.spotifyThumbnail = utilsService.getThumbnailImage(data[index].value.images);
                artist.spotifyId = data[index].value.id;
                return artist;
            }

            return null;
        }).filter(artist => {
            return artist;
        });

        res.json(filteredSelectedInfluencers);
    }).catch(error => {
        console.log('Error getting artist influencers', error);
        res.json(error);
    });
});

export default router;
