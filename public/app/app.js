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
   when('/', {
      templateUrl: 'index.html',
      controller: ''
   }).
   otherwise("/");
});