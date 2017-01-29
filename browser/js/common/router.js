/* jshint esversion:6 */

app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController as ctrl',
        resolve: {
            presentDayArtists: APIFactory => {
                return APIFactory.getPresentDayArtists();
            }
        }
    });

    $stateProvider.state('discover', {
        url: '/discover/',
        templateUrl: 'js/discover/discover.html',
        controller: 'DiscoverController as ctrl',
        params: { 'artistThumbnailInfo': null },
        resolve: {
            artistDiscoveryInfo: ($stateParams, APIFactory) => {
                if ($stateParams.artistThumbnailInfo) {
                    return APIFactory.getArtistData($stateParams.artistThumbnailInfo);
                } else {
                    return null;
                }
            }
        }
    });
});
