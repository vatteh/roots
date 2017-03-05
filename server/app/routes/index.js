/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import artistInfluencers from './artistInfluencers';
import artistData from './artistData';
import topPresentDayArtists from './topPresentDayArtists';
import searchForArtists from './searchForArtists';
import getArtistRoviId from './getArtistRoviId';

let router = express.Router();

router.use('/artistInfluencers', artistInfluencers);
router.use('/artistData', artistData);
router.use('/topPresentDayArtists', topPresentDayArtists);
router.use('/searchForArtists', searchForArtists);
router.use('/getArtistRoviId', getArtistRoviId);

// Make sure this is after all of
// the registered routes!
router.use((req, res) => {
  res.status(404).end();
});

export default router;
