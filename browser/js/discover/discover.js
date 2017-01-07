/* jshint esversion:6 */

app.config(($stateProvider) => {
    $stateProvider.state('discover', {
        url: '/discover',
        templateUrl: 'js/discover/discover.html',
        controller: 'discoverController',
        params:  {'artistData': null}
    });
});

app.controller('discoverController', ($scope, $sce, $stateParams, $state, ArtistInfluences, SpotifyInfo) => {
    function switchArtistInfo(data) {
        $scope.artistData = data;
        $scope.recording = $sce.trustAsResourceUrl($scope.artistData.artistFirstTopTrack.preview_url);
        $scope.currArtist = $scope.artistData.name;
    }

    $scope.nextInfluencer = artistName => {
        let influencer;

        return ArtistInfluences.getArtistInfluences(artistName).then(artist => {
            if (artist.name !== 'StatusCodeError') {
                influencer = artist.name;
                console.log("Got influencer for " + artistName + ": " + influencer);
                return SpotifyInfo.searchForArtist(influencer);
            } else {
                throw new Error('No artist influencer found for - ' + artistName);
            }
        }).then(data => {
            if (data !== null) {
                data.name = influencer;
                switchArtistInfo(data);
            } else {
                throw new Error('No spotify info found for influencer - ' + influencer);
            }
        }).catch(() => {
            $state.go('home');
        });
    };

    $scope.initializeDiscoverPage = () => {
        switchArtistInfo($stateParams.artistData);
    };

    $scope.initializeDiscoverPage();
});
