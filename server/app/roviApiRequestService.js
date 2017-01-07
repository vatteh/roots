/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import requestPromise from 'request-promise';
import md5 from 'js-md5';
import roviKeys from './roviKeys';

export default {
    getArtistInfluences: artistName => {
        let unixTimeStamp = Math.floor(Date.now() / 1000);
        let roviSig = md5(roviKeys.roviApiKey + roviKeys.roviSharedSecret + unixTimeStamp);
        let roviUrl = 'http://api.rovicorp.com/data/v1.1/name/influencers?name=' + artistName.replace(/[\s]/g, "+") + '&country=US&language=en&apikey=' + roviKeys.roviApiKey + '&sig=' + roviSig;

        return requestPromise(roviUrl).then(body => {
            let influencers = JSON.parse(body).influencers;
            if (influencers.length === 0) {
                throw new Error('No influencers were found!');
            } else {
                let randomArtist = influencers[Math.floor(Math.random() * influencers.length)];
                console.log('Random influencer for ' + artistName + ': ', randomArtist.name);
                return randomArtist;
            }
        });
    }
};
