app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($rootScope, $scope, $state, $sce, $q, CurrentTopArtists, ArtistInfluences, SpotifyInfo) {

    $scope.initializeHomePage = function() {
        $rootScope.discoverPage = 0;

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

        if (!$scope.currentTopArtists || $scope.currentTopArtists.length == 0) {
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

    $rootScope.nextInfluencer = function(artistName) {
        var newCurrentArtist;

        // ArtistInfluences.getArtistInfluences will get all influences that will be seen for the artist selected in the front page.
        return ArtistInfluences.getArtistInfluences(artistName)
            .then(function(artist) {
                if (artist.name !== 'StatusCodeError' && $rootScope.discoverPage < 10) {
                    console.log("Got influencer for " + artistName + ": " + artist.name);
                    $rootScope.discoverPage++;
                    newCurrentArtist = artist.name;
                    return SpotifyInfo.searchForArtist(newCurrentArtist);
                } else {
                    throw new Error('No artist influencer found for - ' + artistName);
                }
            })
            .then(function(data) {
                if (data !== null) {
                    $rootScope.artistData = data;
                    $rootScope.recording = $sce.trustAsResourceUrl($rootScope.artistData.artistFirstTopTrack.preview_url);
                    $rootScope.currArtist = newCurrentArtist;
                    $state.go('discover-' + $rootScope.discoverPage);
                } else {
                    throw new Error('No spotify info found for influencer - ' + $rootScope.currArtist);
                }
            })
            .catch(function(err) {
                $state.go('home');
            });
    };

    $scope.initializeHomePage();
});
