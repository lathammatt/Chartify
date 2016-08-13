"use strict";

app.factory("DataFactory", function(FirebaseURL, $q, $http, FireFactory) {

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
  };

  // let getAlbums = function() {
  //   // add albumList to argument
  //   console.log("albumList", albumList);
  //   // gets rid of duplicate album ids in data
  //   let filtered = [];
  //   $.each(albumList, function(i, j) {
  //     if ($.inArray(j, filtered) === -1) filtered.push(j);
  //   });
  //   console.log("filtered", filtered);
  //   let query = filtered.join(",");
  //   let chartdata = [];
  //   return $q(function(resolve, reject) {
  //     $http.get(`https://api.spotify.com/v1/albums/?ids=${query}`)
  //     // $http.get("app/factories/test.json")
  //     .success(function(returnedData) {
  //       for (var i = 0; i < returnedData.albums.length; i++) {
  //         let obj = {};
  //         obj.type = returnedData.albums[i].album_type;
  //         obj.artistname = returnedData.albums[i].artists[0].name;
  //         obj.id = returnedData.albums[i].id;
  //         obj.artwork = returnedData.albums[i].images[1].url;
  //         obj.albumname = returnedData.albums[i].name;
  //         obj.release = returnedData.albums[i].release_date;
  //         obj.songs = [];
  //         for (var j = 0; j < returnedData.albums[i].tracks.items.length; j++) {
  //           let tune = {};
  //           tune.number = returnedData.albums[i].tracks.items[j].track_number;
  //           tune.name = returnedData.albums[i].tracks.items[j].name;
  //           obj.songs.push(tune);
  //         }
  //         chartdata.push(obj);
  //       }
  //       console.log("final", chartdata);
  //       resolve(chartdata);
  //     })
  //       .error(function(error) {
  //         reject(error);
  //       });
  //   });
  // };

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
          albumobj.type = returnedData.albums[i].album_type;
          albumobj.artistname = returnedData.albums[i].artists[0].name;
          albumobj.id = returnedData.albums[i].id;
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
            songs.push(tune);
          }
          FireFactory.postNewAlbum(albumobj, songs)
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
    getSearch, getAlbums, setAlbums
  };

});