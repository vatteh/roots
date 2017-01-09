/* jshint esversion:6 */

app.controller('HomeController', function($scope, $state, $q, CurrentTopArtistsFactory, ArtistInfluencesFactory, SpotifyInfoFactory, currentTopArtists, displayedArtists) {
    this.currentTopArtists = currentTopArtists;
    this.displayedArtists = displayedArtists;

    this.getMoreArtists = () => {
        if (!this.currentTopArtists || this.currentTopArtists.length === 0) {
            return $q.when();
        }
        
        let removed = this.currentTopArtists.splice(0, 10);
        return CurrentTopArtistsFactory.getArtistData(removed).then(response => {
            this.displayedArtists = this.displayedArtists.concat(response);
        }).catch(() => {
            throw new Error('Colud not get more spotify artists!');
        });
    };

    this.startDiscovery = artistName => {
        let influencer;
        return ArtistInfluencesFactory.getArtistInfluences(artistName).then(artist => {
            if (artist.name !== 'StatusCodeError') {
                influencer = artist.name;
                console.log("Got influencer for " + artistName + ": " + influencer);
                return SpotifyInfoFactory.searchForArtist(influencer);
            } else {
                throw new Error('No artist influencer found for - ' + artistName);
            }
        }).then(data => {
            if (data !== null) {
                data.name = influencer;
                $state.go('discover', {artistData: data});
            } else {
                throw new Error('No spotify info found for influencer - ' + influencer);
            }
        });
    };
});
