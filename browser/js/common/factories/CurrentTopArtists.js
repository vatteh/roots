app.factory('CurrentTopArtists', function($http) {
    return {
        getCurrentTopArtists: function() {
            return $http.get('/api/topSpotifyArtists')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                });
        },
        getArtistData: function(artists) {
            var params = {artists: JSON.stringify(artists)};

            return $http.get('/api/topSpotifyArtists/artistData', {params: params})
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                });
        }
    };
});
