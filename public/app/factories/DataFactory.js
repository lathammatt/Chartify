"use strict";

app.factory("DataTransfer", function(FireaseURL, $q, $http, AuthFactory) {

   let getTopSongs = function() {
      let albums = [];
      return $q(function(resolve, reject) {
         $http.get(`"https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}" -H "Accept: application/json" -H "Authorization: Bearer${Oauth_token}`)
            .success(function(returnedData) {
               let songlist = returnedData;
               for (var i = 0; i < songlist.length; i++) {
                  albums.push(items[i].album.id);
               }
               resolve(albums);
            })
            .error(function(error) {
               reject(error);
            });
      });
   };


   let getAlbums = function(albumList) {

   };




});