"use strict";

app.controller("NavCtrl", function($scope) {
  $scope.navItems = [{
    name: "Login",
    url: "#/login"
  }, {
    name: "Search",
    url: "#/search"
  }, {
    name: "Albums",
    url: "#/main"
  }, {
    name: "Refresh",
    url: ""
  }, {
    name: "Connect to Spotify",
    url: "/login"
  }, {
    name: "Logout",
    url: "#/logout"
  }];
});