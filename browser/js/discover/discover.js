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

app.controller('transitionController', function($rootScope, $scope) {
  $scope.pageClass = 'discover-' + $rootScope.discoverPage;
});