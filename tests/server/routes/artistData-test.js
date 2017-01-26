var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /artistData', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return an empty object when no artist is given', function(done) {
        guestAgent.get('/api/artistData').expect(200).end(function(err, response) {
            if (err) return done(err);

            expect(response.body).to.be.a('object');
            expect(response.body).to.be.empty;

            done();
        });
    });

    it('should return artistInfo when given an artistName, artistSpotifyID, & artistRoviID in query', function(done) {
        var query = '?artistName=Radiohead&artistSpotifyID=4Z8W4fKeB5YxbusRsdQVPb&artistRoviID=MN0000326249';

        guestAgent.get('/api/artistData/' + query).expect(200).end(function(err, response) {
            if (err) return done(err);

            expect(response.body).to.be.a('object');
            expect(response.body).to.include.keys('artistData', 'artistTopTracks', 'artistBio');
            expect(response.body.artistTopTracks).to.have.lengthOf(3);

            done();
        });
    });
});
