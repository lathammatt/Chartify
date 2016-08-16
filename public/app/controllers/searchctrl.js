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
      albums.splice(albums.indexOf(value), 1);
    } else {
      albums.push(value);
    }
  };


  $scope.getAlbumsCall = function() {
    DataFactory.setAlbums(albums);

  };



});