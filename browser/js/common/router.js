/* jshint esversion:6 */

app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
    });

    $stateProvider.state('discover', {
        url: '/discover',
        templateUrl: 'js/discover/discover.html',
        controller: 'DiscoverController',
        params:  {'artistData': null}
    });
});

