/* jshint esversion:6 */

app.controller('HomeController', function($scope, $state, $q, CurrentTopArtistsFactory, ArtistInfluencesFactory, SpotifyInfoFactory, currentTopArtists) {
    this.displayedArtists = currentTopArtists;

    // should probally find a smaller image to use here
    // this.displayedArtists.forEach((artist) => {
    //     artist.displayImage = artist.images[Math.floor(Math.random() * artist.images.length)];
    // });

    this.startDiscovery = selectedArtist => {
        this.artistChosen = true;
        selectedArtist.selected = true;
        let influencer;

        return ArtistInfluencesFactory.getArtistInfluences(selectedArtist.name).then(data => {
            influencer = data;
            if (influencer.name !== 'StatusCodeError') {
                console.log("Got influencer for " + selectedArtist.name + ": " + influencer.name);
                return SpotifyInfoFactory.searchForArtist(influencer.name);
            } else {
                throw new Error('No artist influencer found for - ' + selectedArtist.name);
            }
        }).then(data => {
            if (data !== null) {
                data.name = influencer.name;
                $state.go('discover', {artistData: data});
            } else {
                throw new Error('No spotify info found for influencer - ' + influencer.name);
            }
        });
    };
});
