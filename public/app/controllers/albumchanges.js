"use strict";

app.controller('AlbumChangeCtrl', function($scope, ItemStorage, $location, AuthFactory) {
      $scope.newRating = {
         assignedTo: "",
         dependencies: "",
         dueDate: "",
         isCompleted: false,
         location: "",
         task: "",
         urgency: "",
         uid: null
      };