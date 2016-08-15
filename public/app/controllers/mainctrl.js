"use strict";

app.controller("MainCtrl", function($scope, AuthFactory, FireFactory, $location) {

  $scope.userID = AuthFactory.getUser();

  let loadDOM = function() {
    console.log("loading");
    if (AuthFactory.isAuthenticated()) {
      FireFactory.getAlbumList($scope.userID)
        .then((object) => {
          $scope.chartdata = object;
          $location.path("/main");
          console.log("scope1", $scope.chartdata);
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

  loadDOM();

  $scope.deleteAlbumCall = function(album) {
    FireFactory.deleteSongs(album);
    FireFactory.deleteAlbum(album)
      .then((object) => {
        $scope.chartdata = object;
        $location.path("/main");
        FireFactory.getAlbumList()
          .then((object) => {
            $scope.chartdata = object;
            // loadDOM();
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
    console.log("scores", scores);
    let sum = scores.reduce(function(a, b) {
      return (a + b);
    });
    console.log("sum", sum);
    let avg = parseFloat((sum / scores.length).toFixed(4));
    console.log("avg", avg);
    let final = parseFloat((avg + (scores.length * 0.00001)).toFixed(5));
    console.log("final", final);
    FireFactory.updateAlbum(albumID, final);
    // loadDOM();
  }

  $scope.updateSongCall = function(song, rating, album) {
    console.log("rating", song, rating, album);
    FireFactory.updateSong(song, rating);
    updateAlbumScore(album);
  };

});