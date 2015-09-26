app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($scope, CurrentTopArtists) {

    $scope.currentTopArtists = CurrentTopArtists.getCurrentTopArtists()
    	.then(function(response) {
    	    return response;
    	})
    	.catch(function(err) {
    	    return err;
    	})
});
