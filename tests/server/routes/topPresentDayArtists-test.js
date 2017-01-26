var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /topPresentDayArtists', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return 5 top music artists of today at random', function(done) {
        guestAgent.get('/api/topPresentDayArtists').expect(200).end(function(err, response) {
            if (err) return done(err);

            var topArtists = response.body;

            expect(topArtists).to.be.a('array');
            expect(topArtists).to.have.lengthOf(5);
            expect(topArtists[0]).to.include.keys('id', 'name', 'spotifyThumbnail', 'spotifyId');

            done();
        });
    });
});
