"use strict";

app.controller("MainCtrl", function($scope, DataFactory) {
   // console.log("check");

   // $scope.userID = AuthFactory.getUser();

   // if (AuthFactory.isAuthenticated()) {
   //    DataFactory.getAlbums()
   //       .then((itemCollection) => {
   //          $scope.items = itemCollection;
   //       });
   // } else {}

   // DataFactory.getAlbums()
   //    .then((object) => {
   //       $scope.chartdata = object;
   //    });

   DataFactory.getTopSongs()
      .then((object) => {
         $scope.chartdata = object;
      });

});