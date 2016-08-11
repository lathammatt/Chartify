"use strict";

app.controller('AlbumChangeCtrl', function($scope, ItemStorage, $location, AuthFactory) {
   $scope.newRating = {
      artistname: "",
      albumname: "",
      artwork: "",
      id: null,
      rating: "",
      tracktotals: null,
      songs: "",
      uid: null
   };

   $scope.editAlbum = function(albumID) {
      $scope.newTask.uid = AuthFactory.getUser();
      ItemStorage.postNewItem($scope.newTask)
         .then(function(response) {
            $location.url("/items/list");
         });
   };

});