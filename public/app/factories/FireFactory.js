"use strict";

app.factory("FireFactory", function(FirebaseURL, $q, $http) {



  let getAlbumList = function(userID) {
    let chartdata = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/albums.json?orderBy="uid"&equalTo="${userID}"`)
        .success(function(returnedData) {
          let songlist = returnedData;
          Object.keys(songlist).forEach(function(key) {
            songlist[key].id = key;
            chartdata.push(songlist[key]);
            getSongList(userID);
          });
          chartdata.sort(function(a, b) {
            return (b.rating) - (a.rating);
          });
          resolve(chartdata);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  let getSongList = function(userID) {
    let songs = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/songs.json?orderBy="uid"&equalTo="${userID}"`)
        .success(function(returnedData) {
          let songlist = returnedData;
          Object.keys(songlist).forEach(function(key) {
            songlist[key].id = key;
            songs.push(songlist[key]);
            songs.sort(function(a, b) {
              return (a.number) - (b.number);
            });
          });
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
            // matches album FBname to saved value in songs
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

  let updateAlbum = function(albumID, score) {
    return $q(function(resolve, reject) {
      $http.put(`${FirebaseURL}/albums/${albumID}/rating.json`, score)
        .success(function(object) {
          resolve(object);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  let deleteSongs = function(albumID) {
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/songs.json?orderBy="albumID"&equalTo="${albumID}"`)
        .success(function(songs) {
          let songlist = songs;
          Object.keys(songlist).forEach(function(key) {
            songlist[key].id = key;
            $http.delete(`${FirebaseURL}/songs/${key}.json`);
          });
          resolve(songlist);
        })
        .error((error) => {
          reject(error);
        });
    });
  };


  return {
    getAlbumList, deleteAlbum, postNewAlbum, postNewSongs, getSongList, updateSong, updateAlbum, deleteSongs
  };

});