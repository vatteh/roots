/* jshint esversion:6 */

app.controller('DiscoverController', function($stateParams, $state, APIFactory, artistDiscoveryInfo) {
    if (!artistDiscoveryInfo) {
        $state.go('home');
    } else {
        this.artistDiscoveryInfo = artistDiscoveryInfo;

        this.getInfluencers = () => {
            return APIFactory.getArtistInfluencers($stateParams.artistThumbnailInfo.id).then(influencers => {
                this.influencers = influencers;
            }).catch(error => {
                console.log('No influencers found for - ', $stateParams.artistThumbnailInfo.name, error);
                $state.go('home');
            });
        };

        this.getInfluencers();
    }
});
