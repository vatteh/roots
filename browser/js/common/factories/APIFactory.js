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
        },
        searchForArtist: searchText => {
            let params = {
                searchText: searchText
            };

            return $http.get('/api/searchForArtists/', { params: params }).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        },
        getArtistRoviId: artistInfo => {
            return $http.get('/api/getArtistRoviId/', { params: { name: artistInfo.name }}).then(response => {
                return response.data;
            }).catch(err => {
                return err;
            });
        }
    };
});
