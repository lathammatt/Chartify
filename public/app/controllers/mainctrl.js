"use strict";

app.controller("MainCtrl", function($scope, AuthFactory, FireFactory, $location) {

  $scope.userID = AuthFactory.getUser();

  if (AuthFactory.isAuthenticated()) {
    FireFactory.getAlbumList()
      .then((object) => {
        $scope.chartdata = object;
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

  $scope.NewRating = {
    albumID: "",
    rating: ""
  }


  $scope.updateSongCall = function(song, rating) {
    console.log("rating", song, rating);

  };

});