/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import request from 'request-promise-cache';
import md5 from 'js-md5';
import roviKeys from './roviKeys';

function getRoviSig() {
    let unixTimeStamp = Math.floor(Date.now() / 1000);
    return md5(roviKeys.roviApiKey + roviKeys.roviSharedSecret + unixTimeStamp);
}

export default {
    getArtistInfluencers: artistId => {
        let url = 'http://api.rovicorp.com/data/v1.1/name/influencers?nameid=' + artistId + '&country=US&language=en&apikey=' + roviKeys.roviApiKey + '&sig=' + getRoviSig();

        return request({ url: url, cacheKey: artistId + '_getArtistInfluences' }).then(response => {
            return JSON.parse(response.body).influencers;
        }).catch(error => {
            console.log('Could not find artist influencers, returning none', error.body);
            return [];
        });
    },
    getArtistBio: artistId => {
        let url = 'http://api.rovicorp.com/data/v1.1/name/musicbio?nameid=' + artistId + '&country=US&language=English&apikey=' + roviKeys.roviApiKey + '&sig=' + getRoviSig();

        return request({ url: url, cacheKey: artistId + '_getArtistBio' }).then(response => {
            return JSON.parse(response.body).musicBio.musicBioOverview[0];
        });
    },
    getArtistSpotifyData: artistName => {
        let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist";
        return request({ url: url, cacheKey: artistName + '_getArtistSpotifyData' }).then(response => {
            return JSON.parse(response.body).artists.items[0];
        });
    },
    getThumbnailImage: images => {
        for (let i = images.length - 1; i >= 0; i--) {
            if (images[i].height > 200 && images[i].width > 200) {
                return images[i];
            }
        }

        return images[0];
    },
    removeRandomElement: array => {
        return array.splice(Math.floor(Math.random() * array.length), 1)[0];
    }
};
