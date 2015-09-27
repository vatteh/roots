app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($scope, CurrentTopArtists) {

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
