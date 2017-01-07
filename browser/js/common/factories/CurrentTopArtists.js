/* jshint esversion:6 */

app.factory('CurrentTopArtists', ($http) => {
    return {
        getCurrentTopArtists: () => {
            return $http.get('/api/topSpotifyArtists').then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        },
        getArtistData: artists => {
            let params = {artists: JSON.stringify(artists)};

            return $http.get('/api/topSpotifyArtists/artistData', {params: params}).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
