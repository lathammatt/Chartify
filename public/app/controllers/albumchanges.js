"use strict";

app.controller('AlbumChangeCtrl', function($scope, FireFactory, $location, AuthFactory, DataFactory) {
  // $scope.newAlbum = {
  //   artistname: "",
  //   albumname: "",
  //   artwork: "",
  //   id: null,
  //   rating: "",
  //   tracktotals: null,
  //   songs: "",
  //   uid: null
  // };

  $scope.userID = AuthFactory.getUser();

  if (AuthFactory.isAuthenticated()) {
    DataFactory.getAlbums()
      .then((object) => {
        $scope.chartdata = object;
        console.log("loaded");
      });
  } else {}

  // $scope.editAlbum = function() {
  //   $scope.newAlbum.uid = AuthFactory.getUser();
  //   FireFactory.postNewAlbum($scope.newAlbum)
  //     .then(function(response) {
  //       $location.url("/main");
  //     });
  // };

});