app.factory('CurrentTopArtists', function($http) {

  return {
    getCurrentTopArtists: function() {
      return $http.get('/api/topSpotifyArtists')
        .then(function(response) {
          return response.data;
        })
        .catch(function(err) {
          return err;
        })
    }
  };

});