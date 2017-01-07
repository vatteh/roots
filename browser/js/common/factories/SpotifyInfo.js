/* jshint esversion:6 */

app.factory('SpotifyInfo', ($http) => {
    return {
        searchForArtist: artistName => {
            return $http.get('/api/influencerData/' + artistName).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
