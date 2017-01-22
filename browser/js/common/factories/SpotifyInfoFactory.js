/* jshint esversion:6 */

app.factory('SpotifyInfoFactory', ($http) => {
    return {
        searchForArtist: artistName => {
            return $http.get('/api/artistData/' + artistName).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
