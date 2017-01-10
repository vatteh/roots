/* jshint esversion:6 */

app.factory('CurrentTopArtistsFactory', ($http) => {
    return {
        getCurrentTopArtists: () => {
            return $http.get('/api/topSpotifyArtists').then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
