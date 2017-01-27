/* jshint esversion:6 */

app.controller('DiscoverController', function($scope, $sce, $stateParams, $state, APIFactory, artistInfo) {
    this.switchArtistInfo = info => {
        this.artistInfo = info;
        this.recording = $sce.trustAsResourceUrl(this.artistInfo.topTracks[0].preview_url);
    };

    this.nextInfluencer = artistName => {
        let influencer;

        return APIFactory.getArtistInfluences(artistName).then(artist => {
            if (artist.name !== 'StatusCodeError') {
                influencer = artist.name;
                console.log("Got influencer for " + artistName + ": " + influencer);
                return APIFactory.searchForArtist(influencer);
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

    this.switchArtistInfo(artistInfo);
});
