'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var md5 = require('js-md5');
var roviKeys = require('../roviKeys.js');

router.get('/:artistName', function(req, res, next) {
  var unixTimeStamp = Math.floor(Date.now() / 1000);
  var roviSig = md5(roviKeys.roviApiKey + roviKeys.roviSharedSecret + unixTimeStamp);
  var roviUrl = 'http://api.rovicorp.com/data/v1.1/name/influencers?name=' + req.params.artistName.replace(/[\s]/g,"+") + '&country=US&language=en&apikey=' + roviKeys.roviApiKey + '&sig=' + roviSig;

  request(roviUrl, function(error, response, body){
    if (!error && response.statusCode === 200) {
      res.json(JSON.parse(body).influencers);
    } else {
      console.log('Failed to get influencers - ', error);
      res.json(error);
    }
  });

/*
  // If Rovi api keys expire, we need to use MTV scrape method

	var mtvUrl = 'http://www.mtv.com/artists/' + req.params.artistName.replace(/[.\s]/g,"-").replace(/[']/g,"") + '/related-artists/?filter=influencedBy';

  request(mtvUrl, function(err, resp, body){
    var influences = [];
    var $ = cheerio.load(body);
      var divs = $('div.title.multiline');
    	$(divs).each(function(i, elem){
        var nameCleaned = elem.children[0].data.replace(/(\t|\n|\r)/gm,"");
      	influences.push(nameCleaned);
    	});
	  res.json(influences);
  });
*/
});

module.exports = router;
