"use strict";

app.factory("DataTransfer", function(FireaseURL, $q, $http, AuthFactory) {

   let getTopSongs = function() {
      let albums = [];
      return $q(function(resolve, reject) {
         // $http.get(`"https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}" -H "Accept: application/json" -H "Authorization: Bearer${Oauth_token}`)
         $http.get("test2.json")
            .success(function(returnedData) {
               let songlist = returnedData;
               for (var i = 0; i < songlist.length; i++) {
                  albums.push(items[i].album.id);
                  console.log("albums", items[i].album.id);
               }
               resolve(getAlbums(albums));
            })
            .error(function(error) {
               reject(error);
            });
      });
   };


   let getAlbums = function(albumList) {
      let query = albumList.join(",");
      let chartdata = [];
      return $q(function(resolve, reject) {
         $http.get(`https://api.spotify.com/v1/albums/?ids=${query}`);
            .success(function(returnedData) {
               for (var i = 0; i < returnedData.length; i++) {
                  let obj = {};
                  obj.type = albums[i].album_type;
                  obj.artistname = albums[i].artists.name;
                  obj.id = albums[i].id;
                  obj.artwork = albums[i].images[0].url;
                  obj.albumname = albums[i].name;
                  obj.release = albums[i].release_date;
                  obj.songs = {};
                  for (var j = 0; j < returnedData.albums.tracks.length; j++) {
                     obj.songs.number = albums[i].tracks.items[j].track_number;
                     obj.songs.name = albums[i].tracks.items[j].name;
                  }
                  chartdata.push(obj);
               }
            })
         resolve(chartdata)
      });
   };




});