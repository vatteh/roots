app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($rootScope, $scope, $state, CurrentTopArtists, ArtistInfluences) {
    CurrentTopArtists.getCurrentTopArtists()
    	.then(function(response) {
    	    $scope.currentTopArtists = response;
    	})
    	.catch(function(err) {
    	    return err;
    	});

    	$scope.startDiscovery = function(artistName) {
    		// ArtistInfluences.getArtistInfluences will get all influences that will be seen for the artist selected in the front page.
    		ArtistInfluences.getArtistInfluences(artistName)
    		    .then(function(influenceTimeLine) {
    		    	$rootScope.influenceTimeLine = influenceTimeLine;
    		        console.log("Got influence time line for " + artistName + ":" + influenceTimeLine);
    				$state.go('discover-1');
    		    })
    		    .catch(function(err) {
    		        return err;
    		    })
    		    
    	};
});
