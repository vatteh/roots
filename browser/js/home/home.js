app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtrl'
  });
});

app.controller('HomeCtrl', function($rootScope, $scope, $state, CurrentTopArtists, ArtistInfluences) {
  $rootScope.discoverPage = 0;

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
      .then(function(artist) {
        if (artist) {
          $rootScope.discoverPage = 1;
          $rootScope.currArtist = artist.name;
          console.log("Got influencer for " + artistName + ":" + $rootScope.currArtist);
          $state.go('discover-1');
        } else {
          console.log("No influences found for " + artistName);
        }
      })
      .catch(function(err) {
        return err;
      })
  };
});