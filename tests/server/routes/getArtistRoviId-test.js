var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /getArtistRoviId', function() {
    var guestAgent;

    beforeEach('Create guest agent', function() {
        guestAgent = supertest.agent(app);
    });

    it('should return null when no artist is found in rovi database', function(done) {
        guestAgent.get('/api/getArtistRoviId/?name=zxsadfas').expect(200).end(function(err, response) {
            if (err) return done(err);

            var data = response.body;
            expect(data).to.be.a('object');
            expect(data).to.be.empty;
            done();
        });
    });

    it('should return roviId when artist in rovi database is given', function(done) {
        guestAgent.get('/api/getArtistRoviId/?name=J+Dilla').expect(200).end(function(err, response) {
            if (err) return done(err);

            var data = response.body;
            expect(data).to.be.a('object');
            expect(data.name).to.equal('J Dilla');
            expect(data.roviId).to.equal('MN0000428126');
            done();
        });
    });
});
