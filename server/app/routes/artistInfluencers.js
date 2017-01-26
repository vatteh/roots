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

        return Q.all(promises);
    }).then(data => {
        selectedInfluencers.map((artist, index) => {
            if (data[index]) {
                artist.spotifyThumbnail = utilsService.getThumbnailImage(data[index].images);
                artist.spotifyId = data[index].id;
                return artist;
            }

            return null;
        }).filter(artist => {
            return artist;
        });

        res.json(selectedInfluencers);
    }).catch(error => {
        res.json(error);
    });
});

export default router;
