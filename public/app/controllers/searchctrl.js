"use strict";

app.controller("SearchCtrl", function($scope,
  DataFactory) {

  $scope.searchCall = function() {

    DataFactory.getSearch($scope.query)
      .then((object) => {
        $scope.chartdata = object;
      });
  };

  let albums = [];

  $scope.addIDs = function(value) {
    if (albums.indexOf(value) > -1) {
      // albums.push(value);
      console.log("value", value);
    } else {
      albums.splice(albums.indexOf(value), 1);
      console.log("albums", albums);
      console.log("2ndvalue", value);
      albums.push(value);
    }
  };

  // $scope.albums = {
  //   ids: []
  // };

  $scope.getAlbumsCall = function() {
    DataFactory.setAlbums(albums);
  };



});