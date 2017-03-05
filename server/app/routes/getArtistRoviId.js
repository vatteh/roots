/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import utilsService from '../utilsService';

let router = express.Router();

// Given artist name, return searched artist rovi id on Rovi database
router.get('/', (req, res) => {
    utilsService.searchArtistRoviData(req.query.name).then(data => {
        if (!data || !data.ids) {
            res.json(null);
        } else {
            res.json({
                name: data.name,
                roviId: data.ids.nameId
            });
        }
    }).catch(error => {
        console.log('Could not get artist data');
        res.json(error);
    });
});

export default router;
