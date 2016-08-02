"use strict";

var app = angular.module("ChartApp", ['ngRoute'])
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
      controller: 'LoginCtrl'
   }).
   when('/', {
      templateUrl: 'partials/navbar.html',
      controller: 'NavCtrl'
   }).

   otherwise("/");
});