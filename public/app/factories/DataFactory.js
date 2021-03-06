"use strict";

app.factory("DataFactory", function(FirebaseURL, $q, $http, FireFactory, AuthFactory, $location) {


  // to get albums from search via spotify
  let getSearch = function(album) {
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`https://api.spotify.com/v1/search?q=${album}&type=album&limit=50`)
        .success(function(returnedData) {
          for (var i = 0; i < returnedData.albums.items.length; i++) {
            let obj = {};
            obj.type = returnedData.albums.items[i].album_type;
            obj.id = returnedData.albums.items[i].id;
            obj.artwork = returnedData.albums.items[i].images[1].url;
            obj.albumname = returnedData.albums.items[i].name;
            chartdata.push(obj);
          }
          resolve(chartdata);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };


  // to save albums selected from search using setAlbums, then applying to getAlbums
  let albumList = [];

  let setAlbums = function(albums) {
    albumList = albums;
    getAlbums();
  };

  // get albums and their songs selected from search
  let getAlbums = function() {
    // get rid of any duplicate album ids in data
    let filtered = [];
    $.each(albumList, function(i, j) {
      if ($.inArray(j, filtered) === -1) filtered.push(j);
    });
    let query = filtered.join(",");
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`https://api.spotify.com/v1/albums/?ids=${query}`)
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
            albumobj.rating = 1;
            let songs = [];
            for (var j = 0; j < returnedData.albums[i].tracks.items.length; j++) {
              let tune = {};
              tune.number = returnedData.albums[i].tracks.items[j].track_number;
              tune.name = returnedData.albums[i].tracks.items[j].name;
              tune.rating = 1;
              tune.uid = AuthFactory.getUser();
              songs.push(tune);
            }
            FireFactory.postNewAlbum(albumobj, songs);
            chartdata.push(albumobj);
          }
          resolve(chartdata);
          $location.url("/main");
          FireFactory.getAlbumList();
          FireFactory.getSongList();
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