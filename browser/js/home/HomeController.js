/* jshint esversion:6 */

app.controller('HomeController', function($scope, $state, $q, CurrentTopArtistsFactory, ArtistInfluencesFactory, SpotifyInfoFactory, currentTopArtists) {
    this.displayedArtists = currentTopArtists;

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
