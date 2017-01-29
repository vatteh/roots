/* jshint esversion:6 */

app.controller('HomeController', function($state, presentDayArtists) {
    this.artistChosen = false;
    this.displayedArtists = presentDayArtists;

    this.startDiscovery = selectedArtist => {
        this.artistChosen = true;
        selectedArtist.selected = true;
        $state.go('discover', { artistThumbnailInfo: selectedArtist });
    };
});
