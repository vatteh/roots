/* jshint esversion:6 */

app.component('influnecers', {
    restrict: 'E',
    bindings: {
        artists: "="
    },
    template: `
        <div class='artist-choices-container' layout="row" layout-align="center center">
            <div ng-repeat='artist in $ctrl.artists' class='artist-container' ng-class='{"hide-artist": $ctrl.artistChosen && !artist.selected, "hide-selected-artist": artist.selected}'>
                <img class='artist-image' ng-class='{"highlight-selected-artist": artist.selected}' ng-click='$ctrl.selectArtist(artist)' ng-src='{{artist.spotifyThumbnail.url}}' />
            </div>
        </div>`,
    controller: function($state) {
        this.selectArtist = selectedArtist => {
            this.artistChosen = true;
            selectedArtist.selected = true;
            $state.go('discover', { artistThumbnailInfo: selectedArtist });
        };
    }
});
