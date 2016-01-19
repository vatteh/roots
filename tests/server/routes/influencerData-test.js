var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /influencerData', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return 404 when no artist is given', function(done) {
        guestAgent.get('/api/influencerData').expect(404).end(function(err, response) {
            if (err) return done(err);

            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;

            done();
        });
    });

    it('should return 200 when a nonexistent artist is given', function(done) {
        var influencer = 'Fake Artist';

        guestAgent.get('/api/influencerData/' + influencer).expect(200).end(function(err, response) {
            if (err) return done(err);

            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;

            done();
        });
    });

    it('should return Spotify info for a given influencer in Spotify\'s database', function(done) {
        var influencer = 'Kanye West';

        guestAgent.get('/api/influencerData/' + influencer).expect(200).end(function(err, response) {
            if (err) return done(err);

            var influencerData = response.body;
            expect(influencerData).to.be.a('object');
            expect(influencerData).to.include.keys('artistId', 'artistImageURL', 'artistFirstTopTrack');

            expect(influencerData.artistId).to.be.a('string');
            expect(influencerData.artistImageURL).to.be.a('string');
            expect(influencerData.artistFirstTopTrack).to.be.a('object');

            expect(influencerData.artistFirstTopTrack).to.include.keys('name', 'preview_url');

            done();
        });
    });
});
