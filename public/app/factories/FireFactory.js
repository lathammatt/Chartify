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
            chartdata.push(songlist[key]);
            console.log("songlist", songlist);
            getSongList(key);
          });
          resolve(chartdata);
          console.log("chartdata", chartdata);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  let getSongList = function() {
    let songs = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/songs.json?orderBy="number"`)
        .success(function(returnedData) {
          let songlist = returnedData;
          // songlist.orderByChild("number");
          Object.keys(songlist).forEach(function(key) {
            songlist[key].id = key;
            songs.push(songlist[key]);
            songs.sort(function(a, b) {
              return (a.number) - (b.number);
            });
            console.log("songlist", songlist);
            console.log("songs", songs);
          });
          // if (songs.albumID === key) {
          //   console.log("key2", key);
          // }
          resolve(songs);
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
          songs.forEach(function(song) {
            song.albumID = albumID.name;
            postNewSongs(song);
          });
          resolve(key);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  let postNewSongs = function(songs) {
    return $q(function(resolve, reject) {
      console.log("songsfunct", songs);
      $http.post(`${FirebaseURL}/songs.json`, JSON.stringify(songs))
        .success(function(object) {
          resolve(object);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  var deleteAlbum = function(albumID) {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}/albums/${albumID}.json`)
        .success((data) => {
          resolve(data);
        })
        .error((error) => {
          reject(error);
        });
    });
  };

  let updateSong = function(songID, rating) {
    return $q(function(resolve, reject) {
      $http.put(`${FirebaseURL}/songs/${songID}/rating.json`, rating)
        .success(function(object) {
          resolve(object);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  return {
    getAlbumList, deleteAlbum, postNewAlbum, postNewSongs, getSongList, updateSong
  };

});