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
});
