app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtrl'
  });
});

app.controller('HomeCtrl', function($rootScope, $scope, $state, $sce, CurrentTopArtists, ArtistInfluences, SpotifyInfo) {
  $rootScope.discoverPage = 0;

  CurrentTopArtists.getCurrentTopArtists()
    .then(function(response) {
      $scope.currentTopArtists = response;
    })
    .catch(function(err) {
      return err;
    });

  $rootScope.nextInfluencer = function(artistName) {
    var newCurrentArtist;

    // ArtistInfluences.getArtistInfluences will get all influences that will be seen for the artist selected in the front page.
    ArtistInfluences.getArtistInfluences(artistName)
      .then(function(artist) {
        if (artist.name !== 'StatusCodeError' && $rootScope.discoverPage < 10) {
          console.log("Got influencer for " + artistName + ": " + artist.name);
          $rootScope.discoverPage++;
          newCurrentArtist = artist.name;
          return SpotifyInfo.searchForArtist(newCurrentArtist);
        } else {
          throw new Error('No artist influencer found for - ' + artistName);
        }
      }).then(function(data) {
        if (data !== null) {
          $rootScope.artistData = data;
          $rootScope.recording = $sce.trustAsResourceUrl($rootScope.artistData.artistFirstTopTrack.preview_url);
          $rootScope.currArtist = newCurrentArtist;
          $state.go('discover-' + $rootScope.discoverPage);
        } else {
          throw new Error('No spotify info found for influencer - ' + $rootScope.currArtist);
        }
      }).catch(function(err) {
        $rootScope.discoverPage = 0;
        $state.go('home');
      });
  };
});