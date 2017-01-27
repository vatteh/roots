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
        params: { 'artistData': null },
        resolve: {
            artistInfo: ($stateParams, $state, APIFactory) => {
                if (!$stateParams.artistData) {
                    $state.go('home');
                }

                return APIFactory.getArtistData($stateParams.artistData);
            }
        }
    });
});
