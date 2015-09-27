app.factory('ArtistInfluences', function ($http) {

    return {
        getArtistInfluences: function (artistName) {
            return $http.get('/api/artistInfluences/' + artistName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                })
        }
    };

});
