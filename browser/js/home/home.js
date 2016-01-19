/* global console */

app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $state, $q, CurrentTopArtists, ArtistInfluences, SpotifyInfo) {

    $scope.initializeHomePage = function() {
        return CurrentTopArtists.getCurrentTopArtists()
            .then(function(response) {
                $scope.currentTopArtists = response;
                return CurrentTopArtists.getArtistData($scope.currentTopArtists.splice(0, 10));
            })
            .then(function(response) {
                $scope.displayedArtists = response;
            })
            .catch(function(err) {
                throw new Error('Colud not get current top spotify artists!');
                console.log(err);
            });
    };

    $scope.getMoreArtists = function() {

        if (!$scope.currentTopArtists || $scope.currentTopArtists.length === 0) {
            return $q.when();
        }
        
        var removed = $scope.currentTopArtists.splice(0, 10);
        return CurrentTopArtists.getArtistData(removed)
            .then(function(response) {
                $scope.displayedArtists = $scope.displayedArtists.concat(response);
            })
            .catch(function(err) {
                throw new Error('Colud not get more spotify artists!');
                console.log(err);
            });
    };

    $scope.startDiscovery = function(artistName) {
        var influencer;
        return ArtistInfluences.getArtistInfluences(artistName)
            .then(function(artist) {
                if (artist.name !== 'StatusCodeError') {
                    influencer = artist.name;
                    console.log("Got influencer for " + artistName + ": " + influencer);
                    return SpotifyInfo.searchForArtist(influencer);
                } else {
                    throw new Error('No artist influencer found for - ' + artistName);
                }
            })
            .then(function(data) {
                if (data !== null) {
                    data.name = influencer;
                    $state.go('discover', {artistData: data});
                } else {
                    throw new Error('No spotify info found for influencer - ' + influencer);
                }
            });
    };

    $scope.initializeHomePage();
});
