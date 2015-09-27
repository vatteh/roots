app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function() {
        	
        }
    });
});

app.controller('HomeCtrl', function ($scope, $state, CurrentTopArtists, ArtistInfluences) {

    $scope.getArtistInfluences = function(artistName) {
        ArtistInfluences.getArtistInfluences(artistName)
            .then(function(similarArtists) {
                console.log("Got influences for " + artistName + ":" + similarArtists)
                $state.go("discover-1", {"similarArtists": similarArtists})
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
    	})
});
