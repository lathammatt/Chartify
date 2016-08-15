"use strict";

app.factory("DataFactory", function(FirebaseURL, $q, $http, FireFactory, AuthFactory, $location) {

  let getSearch = function(album) {
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`https://api.spotify.com/v1/search?q=${album}&type=album&limit=50`)
      // $http.get("app/factories/test2.json")
      .success(function(returnedData) {
        for (var i = 0; i < returnedData.albums.items.length; i++) {
          let obj = {};
          obj.type = returnedData.albums.items[i].album_type;
          obj.id = returnedData.albums.items[i].id;
          obj.artwork = returnedData.albums.items[i].images[1].url;
          obj.albumname = returnedData.albums.items[i].name;
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

  let albumList = [];

  let setAlbums = function(albums) {
    albumList = albums;
    getAlbums();
    console.log("albumcall", albums);
    $location.url("/main");
  };


  let getAlbums = function() {
    // add albumList to argument
    console.log("albumList", albumList);
    // gets rid of duplicate album ids in data
    let filtered = [];
    $.each(albumList, function(i, j) {
      if ($.inArray(j, filtered) === -1) filtered.push(j);
    });
    console.log("filtered", filtered);
    let query = filtered.join(",");
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`https://api.spotify.com/v1/albums/?ids=${query}`)
      // $http.get("app/factories/test.json")
      .success(function(returnedData) {
        for (var i = 0; i < returnedData.albums.length; i++) {
          let albumobj = {};
          albumobj.uid = AuthFactory.getUser();
          albumobj.type = returnedData.albums[i].album_type;
          albumobj.artistname = returnedData.albums[i].artists[0].name;
          albumobj.spotifyID = returnedData.albums[i].id;
          albumobj.artwork = returnedData.albums[i].images[1].url;
          albumobj.albumname = returnedData.albums[i].name;
          albumobj.tracktotal = returnedData.albums[i].tracks.total;
          albumobj.rating = 0;
          let songs = [];
          for (var j = 0; j < returnedData.albums[i].tracks.items.length; j++) {
            let tune = {};
            tune.number = returnedData.albums[i].tracks.items[j].track_number;
            tune.name = returnedData.albums[i].tracks.items[j].name;
            tune.rating = 0;
            tune.uid = AuthFactory.getUser();
            songs.push(tune);
          }
          FireFactory.postNewAlbum(albumobj, songs);
          chartdata.push(albumobj);
          console.log("final", albumobj, songs);
        }
        resolve(chartdata);
      })
        .error(function(error) {
          reject(error);
        });
    });
  };



  return {
    getSearch, getAlbums, setAlbums
  };

});