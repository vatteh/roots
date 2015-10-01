var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /artistInfluences', function() {
	var guestAgent;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

  it('should return 404 when no artist is given', function(done) {
    guestAgent.get('/api/artistInfluences').expect(404).end(function(err, response) {
      if (err) return done(err);
      
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      done();
    });
  });

  it('should return influences for a given artist', function(done) {
    guestAgent.get('/api/topSpotifyArtists').expect(200).end(function(err, response) {
      if (err) return done(err);
      
      var topArtists = response.body;
      expect(topArtists).to.be.a('array');
      var randomTopArtist = topArtists[Math.floor(Math.random() * topArtists.length)];

      guestAgent.get('/api/artistInfluences/' + randomTopArtist.name).expect(200).end(function(err, response) {
        if (err) return done(err);
        
        var influences = response.body;
        expect(influences).to.be.a('object');
        expect(influences).to.include.keys('id', 'name', 'weight', 'thumbnail');

        done();
      });
    });
  });
});
