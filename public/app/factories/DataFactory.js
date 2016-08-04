"use strict";

app.factory("DataFactory", function(FirebaseURL, $q, $http) {

   let getTopSongs = function() {
      let albums = [];
      return $q(function(resolve, reject) {
         // $http.get(`"https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}" -H "Accept: application/json" -H "Authorization: Bearer${Oauth_token}`)
         $http.get("app/factories/test2.json")
            .success(function(returnedData) {
               let songlist = returnedData;
               console.log("return", returnedData);

               for (var i = 0; i < songlist.items.length; i++) {
                  albums.push(songlist.items[i].album.id);
               }

               console.log("albums", albums);
               resolve(getAlbums(albums));
            })
            .error(function(error) {
               reject(error);
            });
      });
   };

   let getAlbums = function() {
      // add albumList to argument
      // console.log("albumList", albumList);
      // gets rid of duplicate album ids in data
      let filtered = [];
      // $.each(albumList, function(i, j) {
      //    if ($.inArray(j, filtered) === -1) filtered.push(j);
      // });
      // console.log("filtered", filtered);
      let query = filtered.join(",");
      let chartdata = [];
      return $q(function(resolve, reject) {
         // $http.get(`https://api.spotify.com/v1/albums/?ids=${query}`)
         $http.get("app/factories/test.json")
            .success(function(returnedData) {
               for (var i = 0; i < returnedData.albums.length; i++) {
                  let obj = {};
                  obj.type = returnedData.albums[i].album_type;
                  obj.artistname = returnedData.albums[i].artists[0].name;
                  obj.id = returnedData.albums[i].id;
                  obj.artwork = returnedData.albums[i].images[1].url;
                  obj.albumname = returnedData.albums[i].name;
                  obj.release = returnedData.albums[i].release_date;
                  obj.songs = [];
                  for (var j = 0; j < returnedData.albums[i].tracks.items.length; j++) {
                     let tune = {};
                     tune.number = returnedData.albums[i].tracks.items[j].track_number;
                     tune.name = returnedData.albums[i].tracks.items[j].name;
                     obj.songs.push(tune);
                  }
                  chartdata.push(obj);
               }
               console.log("final", chartdata);
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