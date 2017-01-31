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
            if (err) {
                return done(err);  
            }

            expect(response.body).to.be.a('object');
            done();
        });
    });

    it('should return artistInfo when given an artistName, artistSpotifyID, & artistRoviID in query', function(done) {
        var query = '?name=Radiohead&spotifyID=4Z8W4fKeB5YxbusRsdQVPb&roviID=MN0000326249';

        guestAgent.get('/api/artistData/' + query).expect(200).end(function(err, response) {
            if (err) {
                return done(err);
            }

            expect(response.body).to.be.a('object');
            expect(response.body).to.include.keys('data', 'topTracks', 'bio');
            expect(response.body.topTracks).to.have.lengthOf(3);
            expect(response.body.topTracks[0]).to.include.keys('id', 'name', 'previewUrl', 'popularity', 'albumName', 'image');

            done();
        });
    });

    it('should return artistInfo with no bio when given artist with no found rovi bio', function(done) {
        var query = '?name=Grandmaster+Flash+%26+the+Furious+Five&roviID=MN0000738369&spotifyID=1JfnADNz5yYEq3hrzlZHLk';

        guestAgent.get('/api/artistData/' + query).expect(200).end(function(err, response) {
            if (err) {
                return done(err);
            }

            expect(response.body).to.be.a('object');
            expect(response.body).to.include.keys('data', 'topTracks', 'bio');
            expect(response.body.bio).to.be.null;

            done();
        });
    });
});
