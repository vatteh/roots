/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import Q from 'q';

import utilsService from '../utilsService';

function removeRandomElement(array) {
    return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}

function getThumbnailImage(images) {
    for (let i = images.length - 1; i >= 0; i--) {
        if (images[i].height > 200 && images[i].width > 200) {
            return images[i];
        }
    }

    return images[0];
}

let router = express.Router();
router.get('/:artistRoviID', (req, res) => {
    let influencers;
    let selectedInfluencers = [];
    utilsService.getArtistInfluencers(req.params.artistRoviID).then(data => {
        influencers = data;
        while (selectedInfluencers.length < 5 && influencers.length) {
            selectedInfluencers.push(removeRandomElement(influencers));
        }

        let promises = [];
        selectedInfluencers.forEach(artist => {
            promises.push(utilsService.getArtistSpotifyData(artist.name));
        });

        return Q.all(promises);
    }).then(data => {
        selectedInfluencers.map((artist, index) => {
            if (data[index]) {
                artist.spotifyThumbnail = getThumbnailImage(data[index].images);
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
