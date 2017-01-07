/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import roviApiRequestService from '../roviApiRequestService';

let router = express.Router();
router.get('/:artistName', (req, res) => {
    roviApiRequestService.getArtistInfluences(req.params.artistName).then(artist => {
        res.json(artist);
    }).catch(error => {
        res.json(error);
    });
});

export default router;
