"use strict";

app.controller('RatingDemoCtrl', function($scope) {
   $scope.rate = 1;
   $scope.max = 5;
   $scope.isReadonly = false;

   $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
   };

   $scope.ratingStates = [{
      stateOn: 'glyphicon-ok-sign',
      stateOff: 'glyphicon-ok-circle'
   }, {
      stateOn: 'glyphicon-star',
      stateOff: 'glyphicon-star-empty'
   }, {
      stateOn: 'glyphicon-heart',
      stateOff: 'glyphicon-ban-circle'
   }, {
      stateOn: 'glyphicon-heart'
   }, {
      stateOff: 'glyphicon-off'
   }];
});

// app.controller('favoritesCtrl', function($scope) {



//    $scope.rateSelectedAlbum = function(album, index) {
//       if (!album.stars[index].filled) {
//          for (let i = 0; i < index + 1; i++) {
//             album.stars[i].filled = true
//          }
//       } else {
//          for (let i = 4; i > index; --i) {
//             album.stars[i].filled = false
//          }
//       }

//    };

// });