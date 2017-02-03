/* jshint esversion:6 */
'use strict';

let app = angular.module('Roots', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngMaterial']);

app.config(($urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});
