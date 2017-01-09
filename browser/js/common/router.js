/* jshint esversion:6 */

app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController as ctrl',
        resolve: { 
            currentTopArtists: CurrentTopArtistsFactory => {
                return CurrentTopArtistsFactory.getCurrentTopArtists();
            },
            displayedArtists: (CurrentTopArtistsFactory, currentTopArtists) => {
                return CurrentTopArtistsFactory.getArtistData(currentTopArtists.splice(0, 10));
            }
        }
    });

    $stateProvider.state('discover', {
        url: '/discover',
        templateUrl: 'js/discover/discover.html',
        controller: 'DiscoverController as ctrl',
        params:  {'artistData': null}
    });
});

