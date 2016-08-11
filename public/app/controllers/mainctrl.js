"use strict";

app.controller("MainCtrl", function($scope, AuthFactory, FireFactory) {
  // console.log("check");

  $scope.userID = AuthFactory.getUser();

  if (AuthFactory.isAuthenticated()) {
    FireFactory.getAlbumList()
      .then((object) => {
        $scope.chartdata = object;
      });
  } else {}


  // FireFactory.getTopSongs()
  //    .then((object) => {
  //       $scope.chartdata = object;
  //    });

});


// post album, .then returning albumID
// for each song in array, song.albumID = albumID
//