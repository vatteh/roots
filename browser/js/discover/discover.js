app.config(function($stateProvider) {
    $stateProvider.state('discover', {
        url: '/discover',
        templateUrl: 'js/discover/discover.html',
        controller: 'discoverController',
        params:  {'artistData': null}
    });
});

app.controller('discoverController', function($scope, $sce, $stateParams, $state, ArtistInfluences, SpotifyInfo) {
    function switchArtistInfo(data) {
        $scope.artistData = data;
        $scope.recording = $sce.trustAsResourceUrl($scope.artistData.artistFirstTopTrack.preview_url);
        $scope.currArtist = $scope.artistData.name;
    }

    $scope.nextInfluencer = function(artistName) {
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
                    switchArtistInfo(data);
                } else {
                    throw new Error('No spotify info found for influencer - ' + influencer);
                }
            })
            .catch(function(err) {
                $state.go('home');
            });
    };

    $scope.initializeDiscoverPage = function() {
        switchArtistInfo($stateParams.artistData);
    };

    $scope.initializeDiscoverPage();

});
