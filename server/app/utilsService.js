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
        }).catch(() => {
            console.log('Could not find artist influencers for ' + artistId);
            return [];
        });
    },
    getArtistBio: artistId => {
        let url = 'http://api.rovicorp.com/data/v1.1/name/musicbio?nameid=' + artistId + '&country=US&language=English&apikey=' + roviKeys.roviApiKey + '&sig=' + getRoviSig();

        function stripRoviData(text, author) {
            return text.replace(/\[\/?[^\]]+(\])/g, '').replace(' ~ ' + author, '');
        }

        return request({ url: url, cacheKey: artistId + '_getArtistBio' }).then(response => {
            let roviBioData = JSON.parse(response.body).musicBio;

            if (roviBioData.musicBioOverview[0]) {
                return {
                    text: stripRoviData(roviBioData.musicBioOverview[0].overview, roviBioData.musicBioOverview[0].author),
                    author: roviBioData.musicBioOverview[0].author
                };  
            } else {
                return {
                    text: stripRoviData(roviBioData.text, roviBioData.author),
                    author: roviBioData.author
                };
            }
        }).catch(() => {
            console.log('No bio found for ' + artistId);
            return null;
        });
    },
    searchArtistSpotifyData: (artistName, multiple=false) => {
        let url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist";
        return request({ url: url, cacheKey: artistName + '_searchArtistSpotifyData' }).then(response => {
            if (multiple) {
                return JSON.parse(response.body).artists.items.splice(0, 5);
            } else {
                return JSON.parse(response.body).artists.items[0];
            }
        }).catch(() => {
            console.log('No spotify data found for ' + artistName);
            return null;
        });
    },
    searchArtistRoviData: artistName => {
        let url = 'http://api.rovicorp.com/data/v1.1/name/info?name=' + artistName + '&country=USformat=json&language=en&apikey=' + roviKeys.roviApiKey + '&sig=' + getRoviSig();

        return request({ url: url, cacheKey: artistName + '_searchArtistRoviData' }).then(response => {
            return JSON.parse(response.body).name;
        }).catch(() => {
            console.log('Could not find artist Rovi ID for ' + artistName);
            return null;
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
