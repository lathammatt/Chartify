"use strict";

app.controller("MainCtrl", function($scope, AuthFactory, FireFactory) {

  $scope.userID = AuthFactory.getUser();

  if (AuthFactory.isAuthenticated()) {
    FireFactory.getAlbumList()
      .then((object) => {
        $scope.chartdata = object;
      });
  } else {}



});