"use strict";

app.controller("LogInCtrl", function($scope, $location, AuthFactory) {


  $scope.login = function() {

    AuthFactory.authWithProvider()
      .then(function(result) {
        var user = result.user.uid;
        console.log("logged in ", user);
        $location.url("/main");
        $scope.$apply();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
});