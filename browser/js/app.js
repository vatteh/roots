/* jshint esversion:6 */
'use strict';

let app = angular.module('Roots', ['ui.router', 'ngAnimate', 'ngSanitize', 'ngMaterial']);

app.config(($urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});
