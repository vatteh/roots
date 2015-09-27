app.config(function ($stateProvider) {
    $stateProvider.state('discover-1', {
        url: '/discover-1',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 1;
    		$scope.pageClass = 'discover-1';

        //Get Artist Info
    		SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

            $scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   if (artist !== undefined) {
                    $state.go('discover-2');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-2', {
        url: '/discover-2',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 2;
    		$scope.pageClass = 'discover-2';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-3');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-3', {
        url: '/discover-3',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 3;
    		$scope.pageClass = 'discover-3';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-4');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-4', {
        url: '/discover-4',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 4;
    		$scope.pageClass = 'discover-4';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-5');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-5', {
        url: '/discover-5',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 5;
    		$scope.pageClass = 'discover-5';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-6');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-6', {
        url: '/discover-6',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 6;
    		$scope.pageClass = 'discover-6';
    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-7');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-7', {
        url: '/discover-7',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 7;
    		$scope.pageClass = 'discover-7';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-8');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-8', {
        url: '/discover-8',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 8;
    		$scope.pageClass = 'discover-8';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-9');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-9', {
        url: '/discover-9',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences, SpotifyInfo) {
    		$scope.pageNumber = 9;
    		$scope.pageClass = 'discover-9';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   if (artist !== undefined) {
                    $state.go('discover-10');
                   } else {
                    $state.go('home');
                   }
                });
            };
		}
    });

    $stateProvider.state('discover-10', {
        url: '/discover-10',
        templateUrl: 'js/discover/discover.html',
        controller: function($rootScope, $scope, $state, ArtistInfluences) {
    		$scope.pageNumber = 10;
    		$scope.pageClass = 'discover-10';

        //Get Artist Info
        SpotifyInfo.searchForArtist($rootScope.currArtist).then(function(data) {
          $scope.artistData = data
        });

    		$scope.transitionTo = function() {
                ArtistInfluences.getArtistInfluences($rootScope.currArtist).then(function(artist) {
                   $rootScope.currArtist = artist;
                   console.log(artist);
                   $state.go('home');
                });
            };
		}
    });
});
