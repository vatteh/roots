var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /topSpotifyArtists', function() {
	var guestAgent;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

  it('should return the top Spotify artists currently being streamed', function(done) {
    guestAgent.get('/api/topSpotifyArtists').expect(200).end(function(err, response) {
      if (err) return done(err);
      
      var topArtists = response.body;

      expect(topArtists).to.be.a('array');
      expect(topArtists.length).to.be.equal(10);

      for (var i = 0; i < topArtists.length; i++) {
        expect(topArtists[i]).to.include.keys('id', 'name', 'images', 'href', 'external_urls', 'followers');
        expect(topArtists[i].images).to.be.a('array');
        expect(topArtists[i].images).to.have.length.above(0);
      }

      done();
    });
  });
});
