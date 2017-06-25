/* jshint esversion:6 */
/* jshint node: true */
'use strict';

import request from 'request-promise-cache';
import md5 from 'js-md5';
import Q from 'q';
import keys from './keys';

const CACHE_TTL = 3600000;
let spotifyToken = null;
let currentCredentialPromise = null;

function getRoviSig() {
  let unixTimeStamp = Math.floor(Date.now() / 1000);
  return md5(keys.roviApiKey + keys.roviSharedSecret + unixTimeStamp);
}

function getSpotifyClientCredentials() {
  if (spotifyToken) {
    return Q.when(spotifyToken);
  } else if (currentCredentialPromise) {
    return currentCredentialPromise;
  }

  currentCredentialPromise = request({
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(keys.spotifyClientID + ':' + keys.spotifyClientSecret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    }
  }).then((response) => {
    const responseBody = JSON.parse(response.body);
    spotifyToken = responseBody.access_token;
    currentCredentialPromise = null;

    setTimeout(() => {
      spotifyToken = null;
    }, responseBody.expires_in * 1000);

    return spotifyToken;
  });

  return currentCredentialPromise;
}

export default {
  getArtistInfluencers: artistId => {
    const url = 'http://api.rovicorp.com/data/v1.1/name/influencers?nameid=' + artistId + '&country=US&language=en&apikey=' + keys.roviApiKey + '&sig=' + getRoviSig();

    return request({ url: url, cacheKey: artistId + '_getArtistInfluences', cacheTTL: CACHE_TTL }).then(response => {
      return JSON.parse(response.body).influencers;
    }).catch(() => {
      console.log('Could not find artist influencers for ' + artistId);
      return [];
    });
  },
  getArtistBio: artistId => {
    const url = 'http://api.rovicorp.com/data/v1.1/name/musicbio?nameid=' + artistId + '&country=US&language=English&apikey=' + keys.roviApiKey + '&sig=' + getRoviSig();

    function stripRoviData(text, author) {
      return text.replace(/\[\/?[^\]]+(\])/g, '').replace(' ~ ' + author, '');
    }

    return request({ url: url, cacheKey: artistId + '_getArtistBio', cacheTTL: CACHE_TTL }).then(response => {
      const roviBioData = JSON.parse(response.body).musicBio;

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
    const url = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist";

    return getSpotifyClientCredentials().then(token => {
      return request({
        url: url,
        cacheKey: artistName + '_searchArtistSpotifyData',
        cacheTTL: CACHE_TTL,
        headers: {
          'Authorization': 'Bearer ' + token
      }});
    }).then(response => {
      const artists = JSON.parse(response.body).artists;
      return multiple ? artists.items.splice(0, 5) : artists.items[0];
    }).catch(() => {
      console.log('No spotify data found for ' + artistName);
      return null;
    });
  },
  makeAuthorizedSpotifyCall: (url, key) => {
    return getSpotifyClientCredentials().then(token => {
      return request({
        url: url,
        cacheKey: key,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        cacheTTL: CACHE_TTL
      });
    }).catch(err => {
      console.log('Cannot make spotify call: ' + err);
      return null;
    });
  },
  searchArtistRoviData: artistName => {
    const url = 'http://api.rovicorp.com/data/v1.1/name/info?name=' + artistName + '&country=USformat=json&language=en&apikey=' + keys.roviApiKey + '&sig=' + getRoviSig();

    return request({ url: url, cacheKey: artistName + '_searchArtistRoviData', cacheTTL: CACHE_TTL }).then(response => {
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
