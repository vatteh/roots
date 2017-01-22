/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import express from 'express';
import artistInfluences from './artistInfluences';
import artistData from './artistData';
import topSpotifyArtists from './topSpotifyArtists';

let router = express.Router();

router.use('/artistInfluences', artistInfluences);
router.use('/artistData', artistData);
router.use('/topSpotifyArtists', topSpotifyArtists);

// Make sure this is after all of
// the registered routes!
router.use((req, res) => {
  res.status(404).end();
});

export default router;
