var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../../../server/app');

describe('GET /influencerData', function() {
	var guestAgent;

	beforeEach('Create guest agent', function () {
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

  it('should return Spotify info for a given influencer', function(done) {
    guestAgent.get('/api/topSpotifyArtists').expect(200).end(function(err, response) {
      if (err) return done(err);
      
      var topArtists = response.body;
      expect(topArtists).to.be.a('array');
      var randomTopArtist = topArtists[Math.floor(Math.random() * topArtists.length)];

      guestAgent.get('/api/artistInfluences/' + randomTopArtist.name).expect(200).end(function(err, response) {
        if (err) return done(err);
        
        var influencer = response.body;
        expect(influencer).to.be.a('object');
        
        guestAgent.get('/api/influencerData/' + influencer.name).expect(200).end(function(err, response) {
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
  });
});
