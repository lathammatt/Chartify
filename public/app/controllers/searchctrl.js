"use strict";

app.controller("SearchCtrl", function($scope,
  DataFactory, $location) {

  $scope.searchCall = function() {

    DataFactory.getSearch($scope.query)
      .then((object) => {
        $scope.chartdata = object;
      })
  }


  $scope.albums = {
    ids: []
  };

  // $scope.getAlbumsCall = function($scope.albums.ids) {
  //   DataFactory.getAlbums()
  // }



});