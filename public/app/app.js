"use strict";

var app = angular.module("ChartApp", ['ngRoute']) //,'ngAnimate', 'ui.bootstrap'])
   .constant('FirebaseURL', "https://albumchart-f528c.firebaseio.com/");

app.config(function($routeProvider, FBCreds) {
   let authConfig = {
      apiKey: FBCreds.apiKey,
      authDomain: FBCreds.authDomain
   };
   firebase.initializeApp(authConfig);

   $routeProvider.
   when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LogInCtrl'
   }).
   when('/main', {
      templateUrl: 'partials/mainbody.html',
      controller: 'MainCtrl'
   }).
   when('/logout', {
      templateUrl: 'partials/logout.html',
      controller: 'LogOutCtrl'
   }).
   otherwise('/main');
});