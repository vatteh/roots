/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import utilsService from '../utilsService';

let router = express.Router();

// Given searchText, return searched artists found on spotify
router.get('/', (req, res) => {
    utilsService.searchArtistSpotifyData(req.query.searchText, true).then(data => {
        if (!data) {
            res.json([]);
        } else {
            res.json(data.map(element => {
                return {
                    name: element.name,
                    spotifyId: element.id,
                    followers: element.followers.total,
                    spotifyThumbnail: element.images.pop(),
                };
            }));
        }
    }).catch(error => {
        console.log('Could not get artist data');
        res.json(error);
    });
});

export default router;
