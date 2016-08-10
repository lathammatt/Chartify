"use strict";

app.controller("NavCtrl", function($scope) {
   $scope.navItems = [{
      name: "Login",
      url: "#/login"
   }, {
      name: "Get Songs",
      url: ""
   }, {
      name: "Save Changes",
      url: ""
   }, {
      name: "Sort Albums",
      url: ""
   }, {
      name: "Unrated",
      url: ""
   }, {
      name: "Connect to Spotify",
      url: "/login"
   }, {
      name: "Logout",
      url: "#/logout"
   }];
});