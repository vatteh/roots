'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/artistInfluences', require('./artistInfluences'));

router.get('/top-artists', function(req, res) {
	http.get('http://charts.spotify.com/api/tracks/most_streamed/global/us/latest', function(data) {
		res.json(data)
	});
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});