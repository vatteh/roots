/* jshint esversion:6 */

app.factory('ArtistInfluences', ($http) => {
    return {
        getArtistInfluences: artistName => {
            return $http.get('/api/artistInfluences/' + artistName).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
