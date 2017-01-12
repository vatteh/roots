var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /topSpotifyArtists', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return the top Spotify artists currently being streamed', function(done) {
        guestAgent.get('/api/topSpotifyArtists').expect(200).end(function(err, response) {
            if (err) return done(err);

            var topArtists = response.body;

            expect(topArtists).to.be.a('array');
            expect(topArtists).to.have.length.above(0);

            var allNames = {};
            for (var i = 0; i < topArtists.length; i++) {
                expect(topArtists[i]).to.include.keys('external_urls', 'followers', 'genres', 'href', 'id', 'images', 'name', 'popularity', 'type', 'uri');
                expect(allNames[topArtists[i].name]).to.not.be.true;
                allNames[topArtists[i].name] = true;
            }

            done();
        });
    });
});
