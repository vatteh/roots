'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var requestPromise = require('request-promise');
var cheerio = require('cheerio');
var md5 = require('js-md5');
var roviKeys = require('./roviKeys');

module.exports = {
  getArtistInfluences: function(artistName) {
    var unixTimeStamp = Math.floor(Date.now() / 1000);
    var roviSig = md5(roviKeys.roviApiKey + roviKeys.roviSharedSecret + unixTimeStamp);
    var roviUrl = 'http://api.rovicorp.com/data/v1.1/name/influencers?name=' + artistName.replace(/[\s]/g, "+") + '&country=US&language=en&apikey=' + roviKeys.roviApiKey + '&sig=' + roviSig;

    return requestPromise(roviUrl).then(function(body) {
      var influencers = JSON.parse(body).influencers;
      if (influencers.length === 0) {
        return null;
      } else {
        var randomArtist = influencers[Math.floor(Math.random() * influencers.length)];
        console.log('Random influence for ' + artistName + ' - ', randomArtist);
        return randomArtist;
      }
    }).catch(function(error) {
      console.log('Failed to get influencers - ', error);
      return error;
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
  }
};
