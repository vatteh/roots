app.config(function ($stateProvider) {
    $stateProvider.state('discover-1', {
        url: '/discover-1?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.pageNumber = 1;
    		$scope.pageClass = 'discover-1';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];

		}
    });

    $stateProvider.state('discover-2', {
        url: '/discover-2?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover2';
    		$scope.pageNumber = 2;
    		$scope.pageClass = 'discover-2';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-3', {
        url: '/discover-3?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover3';
    		$scope.pageNumber = 3;
    		$scope.pageClass = 'discover-3';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-4', {
        url: '/discover-4?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover4';
    		$scope.pageNumber = 4;
    		$scope.pageClass = 'discover-4';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-5', {
        url: '/discover-5?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover5';
    		$scope.pageNumber = 5;
    		$scope.pageClass = 'discover-5';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-6', {
        url: '/discover-6?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover6';
    		$scope.pageNumber = 6;
    		$scope.pageClass = 'discover-6';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-7', {
        url: '/discover-7?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover7';
    		$scope.pageNumber = 7;
    		$scope.pageClass = 'discover-7';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-8', {
        url: '/discover-8?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover8';
    		$scope.pageNumber = 8;
    		$scope.pageClass = 'discover-8';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-9', {
        url: '/discover-9?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover9';
    		$scope.pageNumber = 9;
    		$scope.pageClass = 'discover-9';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });

    $stateProvider.state('discover-10', {
        url: '/discover-10?:artistArray',
        templateUrl: 'js/discover/discover.html',
        controller: function($scope, $stateParams) {
    		$scope.artist = 'discover10';
    		$scope.pageNumber = 10;
    		$scope.pageClass = 'discover-10';
    		$scope.artistArray = $stateParams.artistArray;
    		$scope.currArtist = $scope.artistArray[$scope.pageNumber];
		}
    });
});
