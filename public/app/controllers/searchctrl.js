"use strict";

app.controller("SearchCtrl", function($scope,
  DataFactory) {

  let album = $("#albumsearch").val;

  DataFactory.getSearch(album)
    .then((object) => {
      $scope.chartdata = object;
    })



});