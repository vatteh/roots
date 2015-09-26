'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

router.get('/:artistName', function(req, res, next) {
	
	var url = 'http://www.mtv.com/artists/' + req.params.artistName.replace(/ /g,"-") + '/related-artists/?filter=influencedBy';

  request(url, function(err, resp, body){
    var influences = [];
    var $ = cheerio.load(body);
      var divs = $('div.title.multiline');
    	$(divs).each(function(i, elem){
        var nameCleaned = elem.children[0].data.replace(/(\t|\n|\r)/gm,"");
      	influences.push(nameCleaned);
    	});
	  res.json(influences);
  });
});

module.exports = router;