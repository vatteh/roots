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

            console.log('topArtists', topArtists);

            var allNames = {};
            for (var i = 0; i < topArtists.length; i++) {
                expect(topArtists[i]).to.include.keys('artist_name', 'artist_url');
                expect(allNames[topArtists[i].artist_name]).to.not.be.true;
                allNames[topArtists[i].artist_name] = true;
            }

            done();
        });
    });

    it('should return artist data for the given array of Spotify artists', function(done) {
        var sampleArtists = [{
            "artist_name": "Nick Jonas",
            "artist_url": "https://play.spotify.com/artist/4Rxn7Im3LGfyRkY2FlHhWi"
        }, {
            "artist_name": "Blake Shelton",
            "artist_url": "https://play.spotify.com/artist/1UTPBmNbXNTittyMJrNkvw"
        }, {
            "artist_name": "Kendrick Lamar",
            "artist_url": "https://play.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
        }, {
            "artist_name": "Ed Sheeran",
            "artist_url": "https://play.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V"
        }, {
            "artist_name": "I LOVE MAKONNEN",
            "artist_url": "https://play.spotify.com/artist/3aGFCoR8xGN6DKwvdzeSja"
        }, {
            "artist_name": "Drake",
            "artist_url": "https://play.spotify.com/artist/3TVXtAsR1Inumwj472S9r4"
        }, {
            "artist_name": "Rae Sremmurd",
            "artist_url": "https://play.spotify.com/artist/7iZtZyCzp3LItcw1wtPI3D"
        }, {
            "artist_name": "Pitbull",
            "artist_url": "https://play.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
        }, {
            "artist_name": "Maroon 5",
            "artist_url": "https://play.spotify.com/artist/04gDigrS5kc9YWfZHwBETP"
        }, {
            "artist_name": "Calvin Harris",
            "artist_url": "https://play.spotify.com/artist/7CajNmpbOovFoOoasH2HaY"
        }];

        guestAgent.get('/api/topSpotifyArtists/artistData/').query({artists: JSON.stringify(sampleArtists)}).expect(200).end(function(err, response) {
            if (err) return done(err);

            var topArtists = response.body;

            expect(topArtists).to.be.a('array');
            expect(topArtists.length).to.equal(sampleArtists.length);

            var allNames = {};
            for (var i = 0; i < topArtists.length; i++) {
                expect(topArtists[i]).to.include.keys('id', 'name', 'images');
            }

            done();
        });
    });
});
