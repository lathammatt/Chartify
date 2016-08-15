"use strict";

app.controller("MainCtrl", function($scope, AuthFactory, FireFactory, $location) {

  $scope.userID = AuthFactory.getUser();

  if (AuthFactory.isAuthenticated()) {
    FireFactory.getAlbumList()
      .then((object) => {
        $scope.chartdata = object;
        $location.path("/main");
        console.log("scope1", $scope.chartdata);
      });
  } else {}

  if (AuthFactory.isAuthenticated()) {
    FireFactory.getSongList()
      .then((object) => {
        $scope.songs = object;
        console.log("scope2", $scope.songs);
      });
  } else {}

  $scope.deleteAlbumCall = function(album) {
    FireFactory.deleteAlbum(album)
      .then((object) => {
        $scope.chartdata = object;
        $location.path("/main");
        FireFactory.getAlbumList()
          .then((object) => {
            $scope.chartdata = object;
          })

      })
  }

  function updateAlbumScore(albumID) {
    console.log("album", albumID);
    let scores = [];
    for (var x in $scope.songs) {
      console.log("forloop", x);
      if ($scope.songs[x].albumID === albumID) {
        console.log("id", $scope.songs[x].albumID);
        scores.push(parseInt($scope.songs[x].rating));
      };
    };
    console.log("scores", scores);
    let sum = scores.reduce(function(a, b) {
      return (a + b);
    });
    console.log("sum", sum);
    let avg = parseFloat((sum / scores.length).toFixed(4));
    console.log("avg", avg);
    let final = parseFloat((avg + (scores.length * 0.00001)).toFixed(5));
    console.log("final", final);

  };

  $scope.updateSongCall = function(song, rating, album) {
    console.log("rating", song, rating, album);
    FireFactory.updateSong(song, rating);
    updateAlbumScore(album);
  };




});