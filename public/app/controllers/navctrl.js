"use strict";

app.controller("NavCtrl", function($scope) {
   $scope.navItems = [{
      name: "Top Albums",
      url: "#/"
   }, {
      name: "Top Songs",
      url: "#/"
   }, {
      name: "Current Year",
      url: "#/"
   }, {
      name: "Unstarred Songs",
      url: "#/"
   }, {
      name: "Logout",
      url: "#/"
   }],
});