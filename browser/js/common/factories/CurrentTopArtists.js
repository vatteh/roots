app.factory('CurrentTopArtists', function ($http) {

    return {
        getCurrentTopArtists: function () {
            return $http.get('/api/top-artists')
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                })
        }
    };

});
