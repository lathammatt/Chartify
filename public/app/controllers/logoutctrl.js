"use strict";

app.controller("LogOutCtrl", function($scope, $location, AuthFactory) {

   $scope.logout = function() {

      firebase.auth().signOut().then(function() {
         // Sign-out successful.
         AuthFactory.currentUserID = null;
         // AuthFactory.logout();
         // need to test above coding
         console.log(AuthFactory.getUser(), "Logged out");
         $location.path("/login");
         $scope.$apply();
      }, function(error) {
         // An error happened.
         console.log(error);
      });
   };
});