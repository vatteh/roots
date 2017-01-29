/* jshint esversion:6 */

app.factory('APIFactory', ($http) => {
    return {
        getPresentDayArtists: () => {
            return $http.get('/api/topPresentDayArtists/').then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        },
        getArtistInfluencers: roviID => {
            return $http.get('/api/artistInfluencers/' + roviID).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        },
        getArtistData: artist => {
            let params = {
                name: artist.name,
                roviID: artist.id,
                spotifyID: artist.spotifyId
            };

            return $http.get('/api/artistData/', { params: params }).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
