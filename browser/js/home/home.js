/* jshint esversion:6 */

app.controller('HomeController', ($scope, $state, $q, CurrentTopArtists, ArtistInfluences, SpotifyInfo) => {
    $scope.initializeHomePage = () => {
        return CurrentTopArtists.getCurrentTopArtists().then(response => {
            $scope.currentTopArtists = response;
            return CurrentTopArtists.getArtistData($scope.currentTopArtists.splice(0, 10));
        }).then(response => {
            $scope.displayedArtists = response;
        }).catch(() => {
            throw new Error('Colud not get current top spotify artists!');
        });
    };

    $scope.getMoreArtists = () => {
        if (!$scope.currentTopArtists || $scope.currentTopArtists.length === 0) {
            return $q.when();
        }
        
        let removed = $scope.currentTopArtists.splice(0, 10);
        return CurrentTopArtists.getArtistData(removed).then(response => {
            $scope.displayedArtists = $scope.displayedArtists.concat(response);
        }).catch(() => {
            throw new Error('Colud not get more spotify artists!');
        });
    };

    $scope.startDiscovery = artistName => {
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
                $state.go('discover', {artistData: data});
            } else {
                throw new Error('No spotify info found for influencer - ' + influencer);
            }
        });
    };

    $scope.initializeHomePage();
});
