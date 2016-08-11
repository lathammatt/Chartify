"use strict";

app.controller('AlbumChangeCtrl', function($scope, FireFactory, $location, AuthFactory) {
  $scope.newAlbum = {
    artistname: "",
    albumname: "",
    artwork: "",
    id: null,
    rating: "",
    tracktotals: null,
    songs: "",
    uid: null
  };

  $scope.editAlbum = function() {
    $scope.newAlbum.uid = AuthFactory.getUser();
    FireFactory.postNewAlbum($scope.newAlbum)
      .then(function(response) {
        $location.url("/main");
      });
  };

});