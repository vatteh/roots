var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /artistInfluencers', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return an empty array when no artistRoviId is given', function(done) {
        guestAgent.get('/api/artistInfluencers').expect(404).end(function(err, response) {
            if (err) return done(err);

            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;
            done();
        });
    });

    it('should an empty array when artist with no influencers is given', function(done) {
        var randomArtistRoviId = 'MN0000195430';

        guestAgent.get('/api/artistInfluencers/' + randomArtistRoviId).expect(200).end(function(err, response) {
            if (err) return done(err);

            var influencers = response.body;
            expect(influencers).to.be.a('array');
            expect(influencers).to.have.lengthOf(0);
            done();
        });
    });

    it('should return influencers for a given artist roviId', function(done) {
        var randomArtistRoviId = 'MN0000326249'; // Radiohead

        guestAgent.get('/api/artistInfluencers/' + randomArtistRoviId).expect(200).end(function(err, response) {
            if (err) return done(err);

            var influencers = response.body;
            expect(influencers).to.be.a('array');
            expect(influencers).to.have.length.below(6);
            expect(influencers[0]).to.include.keys('id', 'name', 'weight', 'thumbnail', 'spotifyThumbnail', 'spotifyId');

            done();
        });
    });
});
