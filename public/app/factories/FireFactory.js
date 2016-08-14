"use strict";

app.factory("FireFactory", function(FirebaseURL, $q, $http) {

  let getAlbumList = function() {
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/albums.json`)
        .success(function(returnedData) {
          let songlist = returnedData;
          Object.keys(songlist).forEach(function(key) {
            songlist[key].id = key;
            console.log("key", key);
            chartdata.push(songlist[key]);
            console.log("chart", chartdata);
          });
          resolve(chartdata);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  let postNewAlbum = function(newAlbum, songs) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}/albums.json`,
        JSON.stringify(newAlbum))
        .success(function(key) {
          let albumID = key;
          console.log("albumid", albumID.name);
          songs.forEach(function(song) {
            song.albumID = albumID.name;
          });
          postNewSongs(songs);
          resolve(key);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  let postNewSongs = function(songs) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}/songs.json`, JSON.stringify(songs))
        .success(function(object) {
          resolve(object);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  var deleteAlbum = function(dataID) {
    return $q((resolve, reject) => {
      $http.delete(
        `${FirebaseURL}/${dataID}.json`
      )
        .success((data) => {
          resolve(data);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  // let editAlbum = function(dataID) {
  //   return $q(function(resolve, reject) {
  //     $http.post(`${FirebaseURL}/${dataID}.json`,
  //       JSON.stringify(newAlbum))
  //       .success(function(ObjFromFirebase) {
  //         resolve(ObjFromFirebase);
  //       })
  //       .error(function(error) {
  //         reject(error);
  //       });
  //   });
  // };

  return {
    getAlbumList, deleteAlbum, postNewAlbum, postNewSongs
  };

});