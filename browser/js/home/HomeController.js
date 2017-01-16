/* jshint esversion:6 */

app.controller('HomeController', function($scope, $state, $q, CurrentTopArtistsFactory, ArtistInfluencesFactory, SpotifyInfoFactory, currentTopArtists) {
    this.displayedArtists = currentTopArtists;

    // should probally find a smaller image to use here
    // this.displayedArtists.forEach((artist) => {
    //     artist.displayImage = artist.images[Math.floor(Math.random() * artist.images.length)];
    // });

    this.startDiscovery = artist => {
        this.artistChosen = true;
        artist.selected = true;
        let influencer;

        return ArtistInfluencesFactory.getArtistInfluences(artist.name).then(artist => {
            if (artist.name !== 'StatusCodeError') {
                influencer = artist.name;
                console.log("Got influencer for " + artist.name + ": " + influencer);
                return SpotifyInfoFactory.searchForArtist(influencer);
            } else {
                throw new Error('No artist influencer found for - ' + artist.name);
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
