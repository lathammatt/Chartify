"use strict";

app.controller("NavCtrl", function($scope) {
  $scope.navItems = [{
    name: "Login",
    url: "#/login"
  }, {
    name: "Search",
    url: "#/search"
  }, {
    name: "Sort Albums",
    url: ""
  }, {
    name: "",
    url: ""
  }, {
    name: "Connect to Spotify",
    url: "/login"
  }, {
    name: "Logout",
    url: "#/logout"
  }];
});