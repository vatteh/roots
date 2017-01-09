/* jshint esversion:6 */

app.controller('DiscoverController', function($scope, $sce, $stateParams, $state, ArtistInfluencesFactory, SpotifyInfoFactory) {
    this.switchArtistInfo = artistData => {
        this.artistData = artistData;
        this.recording = $sce.trustAsResourceUrl(this.artistData.artistFirstTopTrack.preview_url);
        this.currArtist = this.artistData.name;
    };

    this.nextInfluencer = artistName => {
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
                this.switchArtistInfo(data);
            } else {
                throw new Error('No spotify info found for influencer - ' + influencer);
            }
        }).catch(() => {
            $state.go('home');
        });
    };

    this.switchArtistInfo($stateParams.artistData);
});
