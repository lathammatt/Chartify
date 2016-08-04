"use strict";

app.factory("DataFactory", function(FirebaseURL, $q, $http) {

   let getTopSongs = function() {
      console.log("check2");
      let albums = [];
      return $q(function(resolve, reject) {
         // $http.get(`"https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}" -H "Accept: application/json" -H "Authorization: Bearer${Oauth_token}`)
         $http.get("app/factories/test2.json")
            .success(function(returnedData) {
               let songlist = returnedData;
               console.log("return", returnedData);

               for (var i = 0; i < songlist.items.length; i++) {
                  albums.push(songlist.items[i].album.id);
                  console.log("items", songlist.items[i].album.id);
               }

               resolve(albums);
               console.log("albums", albums);
            })
            .error(function(error) {
               reject(error);
            });
      });
   };

   let getAlbums = function() {
      // let query = albumList.join(",");
      let chartdata = [];
      return $q(function(resolve, reject) {
         // $http.get(`https://api.spotify.com/v1/albums/?ids=${query}`)
         $http.get("app/factories/test.json")
            .success(function(returnedData) {
               console.log("data", returnedData);
               for (var i = 0; i < returnedData.length; i++) {
                  let obj = {};
                  obj.type = returnedData.albums[i].album_type;
                  console.log("type", returnedData.albums[i].album_type);
                  obj.artistname = returnedData.albums[i].artists.name;
                  obj.id = returnedData.albums[i].id;
                  obj.artwork = returnedData.albums[i].images[0].url;
                  obj.albumname = returnedData.albums[i].name;
                  obj.release = returnedData.albums[i].release_date;
                  obj.songs = {};
                  for (var j = 0; j < returnedData.albums.tracks.length; j++) {
                     obj.songs.number = returnedData.albums[i].tracks.items[j].track_number;
                     obj.songs.name = returnedData.albums[i].tracks.items[j].name;
                  }
                  chartdata.push(obj);
               }
               resolve(chartdata);
            })
            .error(function(error) {
               reject(error);
            });
      });
   };


   return {
      getTopSongs, getAlbums
   };

});