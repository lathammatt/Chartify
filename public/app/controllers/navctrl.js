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
    },
    // Spotify login area, requires node.js
    //   {
    //   name: "Connect to Spotify",
    //   url: "/login"
    // },
    {
      name: "Logout",
      url: "#/logout"
    }
  ];
});