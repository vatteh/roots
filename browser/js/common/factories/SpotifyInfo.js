app.factory('SpotifyInfo', function ($http) {
    return {
        searchForArtist: function(artistName) {
            return $http.get('/api/influencerData/' + artistName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                });
        }
    };

});
