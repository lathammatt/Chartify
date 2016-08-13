"use strict";

app.factory("FireFactory", function(FirebaseURL, $q, $http, AuthFactory) {

  let getAlbumList = function() {
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/albums.json`)
      // $http.get("app/factories/test.json")
      .success(function(returnedData) {
        let songlist = returnedData;
        Object.keys(songlist).forEach(function(key) {
          songlist[key].id = key;
          chartdata.push(songlist[key]);
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
          resolve(key);
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

  let editAlbum = function(dataID) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}/${dataID}.json`,
        JSON.stringify(newAlbum))
        .success(function(ObjFromFirebase) {
          resolve(ObjFromFirebase);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  return {
    getAlbumList, deleteAlbum, editAlbum, postNewAlbum
  };

});