app.config(function ($stateProvider) {
    $stateProvider.state('discover-1', {
        url: '/discover-1/',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams, $state) {
    		$scope.artist = $stateParams.similarArtists;
    		$scope.pageNumber = 1;
		}
    });

    $stateProvider.state('discover-2', {
        url: '/discover-2',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover2';
    		$scope.pageNumber = 2;
		}
    });

    $stateProvider.state('discover-3', {
        url: '/discover-3',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover3';
    		$scope.pageNumber = 3;
		}
    });

    $stateProvider.state('discover-4', {
        url: '/discover-4',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover4';
    		$scope.pageNumber = 4;
		}
    });

    $stateProvider.state('discover-5', {
        url: '/discover-5',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover5';
    		$scope.pageNumber = 5;
		}
    });

    $stateProvider.state('discover-6', {
        url: '/discover-6',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover6';
    		$scope.pageNumber = 6;
		}
    });

    $stateProvider.state('discover-7', {
        url: '/discover-7',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover7';
    		$scope.pageNumber = 7;
		}
    });

    $stateProvider.state('discover-8', {
        url: '/discover-8',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover8';
    		$scope.pageNumber = 8;
		}
    });

    $stateProvider.state('discover-9', {
        url: '/discover-9',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover9';
    		$scope.pageNumber = 9;
		}
    });

    $stateProvider.state('discover-10', {
        url: '/discover-10',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope) {
    		$scope.artist = 'discover10';
    		$scope.pageNumber = 10;
		}
    });
});
