app.factory('SpotifyInfo', function ($http) {

    return {
        searchForArtist: function(artistName) {
            console.log("SEARCHING!!!")
            return $http.get('/api/searchForArtist/' + artistName)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                });
        }
        // getArtistInfo: function(artistId) {
        //     return $http.get('/api/getArtistInfo/' + artistName)
        //         .then(function(response) {
        //             return response.data[Math.floor(Math.random()*response.data.length)];
        //         })
        //         .catch(function(err) {
        //             return err;
        //         });
        // },
        // getArtistTopTrack: function(artistId) {
        //     return $http.get('/api/getArtistTopTrack/' + artistName)
        //         .then(function(response) {
        //             return response.data[Math.floor(Math.random()*response.data.length)];
        //         })
        //         .catch(function(err) {
        //             return err;
        //         });
        // }
        // getArtistBio: function(artistName) {
        //     return $http.get('/api/artistInfluences/' + artistName)
        //         .then(function(response) {
        //             return response.data[Math.floor(Math.random()*response.data.length)];
        //         })
        //         .catch(function(err) {
        //             return err;
        //         });
        // }
    };

});
