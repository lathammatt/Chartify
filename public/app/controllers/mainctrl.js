"use strict";

app.controller("MainCtrl", function($scope, AuthFactory, FireFactory, $location) {

  $scope.userID = AuthFactory.getUser();

  let loadDOM = function() {
    if (AuthFactory.isAuthenticated()) {
      FireFactory.getAlbumList($scope.userID)
        .then((object) => {
          $scope.chartdata = object;
          $location.path("/main");
        });
    } else {}

    if (AuthFactory.isAuthenticated()) {
      FireFactory.getSongList($scope.userID)
        .then((object) => {
          $scope.songs = object;
          $scope.$apply;
        });
    } else {}
  };

  // set to make DOM load upon main page reload
  loadDOM();

  $scope.deleteAlbumCall = function(album) {
    FireFactory.deleteSongs(album);
    FireFactory.deleteAlbum(album)
      .then((object) => {
        $scope.chartdata = object;
        $location.url("/main");
        FireFactory.getAlbumList()
          .then((object) => {
            $scope.chartdata = object;
            loadDOM();
          });
      });
  };

  function updateAlbumScore(albumID) {
    let scores = [];
    for (var x in $scope.songs) {
      if ($scope.songs[x].albumID === albumID) {
        scores.push(parseInt($scope.songs[x].rating));
      }
    }
    let sum = scores.reduce(function(a, b) {
      return (a + b);
    });
    let avg = parseFloat((sum / scores.length).toFixed(4));
    let final = parseFloat((avg + (scores.length * 0.00001)).toFixed(5));
    FireFactory.updateAlbum(albumID, final);
  }

  $scope.updateSongCall = function(song, rating, album) {
    FireFactory.updateSong(song, rating);
    updateAlbumScore(album);
  };

});