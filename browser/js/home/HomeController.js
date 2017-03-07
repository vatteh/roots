/* jshint esversion:6 */

app.controller('HomeController', function($state, APIFactory, presentDayArtists) {
    this.artistChosen = false;
    this.searchText = '';
    this.presentDayArtists = presentDayArtists;

    this.startDiscovery = selectedArtist => {
        this.artistChosen = true;
        selectedArtist.selected = true;
        $state.go('discover', { artistThumbnailInfo: selectedArtist });
    };

    this.querySearch = searchText => {
        return APIFactory.searchForArtist(searchText).then(results => {
            return results;
        });
    };

    this.selectedItemChange = artist => {
        if (!artist) {
            return;
        }

        this.gettingArtistRoviId = true;
        this.displayNoIdError = false;
        APIFactory.getArtistRoviId(artist).then(data => {
            this.gettingArtistRoviId = false;
            if (data && data.roviId) {
                let selectedArtist = {
                    name: artist.name,
                    id: data.roviId,
                    spotifyId: artist.spotifyId,
                    spotifyThumbnail: artist.spotifyThumbnail,
                };

                $state.go('discover', { artistThumbnailInfo: selectedArtist });  
            } else {
                this.displayNoIdError = true;
            }
        });
    };
});
