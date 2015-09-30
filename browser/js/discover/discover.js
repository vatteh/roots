app.config(function($stateProvider) {
  $stateProvider.state('discover-1', {
    url: '/discover-1',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-2', {
    url: '/discover-2',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-3', {
    url: '/discover-3',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-4', {
    url: '/discover-4',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-5', {
    url: '/discover-5',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-6', {
    url: '/discover-6',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-7', {
    url: '/discover-7',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-8', {
    url: '/discover-8',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-9', {
    url: '/discover-9',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });

  $stateProvider.state('discover-10', {
    url: '/discover-10',
    templateUrl: 'js/discover/discover.html',
    controller: 'transitionController'
  });
});

app.controller('transitionController', function($rootScope, $scope, $state, $sce, ArtistInfluences, SpotifyInfo) {
  $scope.pageClass = 'discover-' + $rootScope.discoverPage;

  //Get Artist Info
  SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
    if (data === null) {
      $rootScope.discoverPage = 0;
      $state.go('home');
    } else {
      $scope.artistData = data;
      $scope.recording = $sce.trustAsResourceUrl($scope.artistData.artistFirstTopTrack.preview_url);
    }
  });

  $scope.transitionTo = function() {
    ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
      if (artist && $rootScope.discoverPage < 10) {
        $rootScope.currArtist = artist.name;
        $rootScope.discoverPage++;
        $state.go('discover-' + $rootScope.discoverPage);
      } else {
        $rootScope.discoverPage = 0;
        $state.go('home');
      }
    });
  };
});