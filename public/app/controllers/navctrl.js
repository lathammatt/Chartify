"use strict";

app.controller("NavCtrl", function($scope) {
  $scope.navItems = [{
    name: "Login",
    url: "#/login"
  }, {
    name: "Search",
    url: "#/search"
  }, {
    name: "Main Albums",
    url: "#/main"
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