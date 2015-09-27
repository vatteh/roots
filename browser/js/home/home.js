app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($scope, CurrentTopArtists, ArtistInfluences) {

    $scope.getArtistInfluences = function(artistName) {
        ArtistInfluences.getArtistInfluences(artistName)
            .then(function(response) {
                console.log("Got influences for " + artistName + ":" + response)
            })
            .catch(function(err) {
                return err;
            })
    }

    CurrentTopArtists.getCurrentTopArtists()
    	.then(function(response) {
    	    $scope.currentTopArtists = response;
    	})
    	.catch(function(err) {
    	    return err;
    	});

    	$scope.startDiscovery = function(artistName) {
    		$state.go('discover-1', { param: [artistName] });
    	};
});
