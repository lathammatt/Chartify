"use strict";

app.factory("FireFactory", function(FirebaseURL, $q, $http, AuthFactory) {

   let getAlbumList = function(userID) {
      let chartdata = [];
      return $q(function(resolve, reject) {
         $http.get(`${FirebaseURL}/${userID}.json`)
         // $http.get("app/factories/test.json")
         .success(function(returnedData) {
            let songlist = returnedData;
            console.log("return", returnedData);
            Object.keys(songlist).forEach(function(key) {
               songlist[key].id = key;
               console.log("key", key);
               chartdata.push(songlist[key]);
            });
            resolve(chartdata);
         })
            .error(function(error) {
               reject(error);
            });
      });
   };



});