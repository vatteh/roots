var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /searchForArtists', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return an empty array when no string is given', function(done) {
        guestAgent.get('/api/searchForArtists/?searchText=').expect(200).end(function(err, response) {
            if (err) return done(err);

            var results = response.body;
            expect(results).to.be.a('array');
            expect(results).to.have.lengthOf(0);
            done();
        });
    });

    it('should return results when string is given', function(done) {
        guestAgent.get('/api/searchForArtists/?searchText=Radiohead').expect(200).end(function(err, response) {
            if (err) return done(err);

            var results = response.body;
            expect(results).to.be.a('array');
            expect(results).to.have.length.above(0);
            expect(results[0]).to.include.keys('name', 'spotifyId', 'followers');
            done();
        });
    });
});
