/* jshint esversion:6 */

app.component('influnecers', {
    restrict: 'E',
    bindings: {
        artists: '='
    },
    template: `
        <div class='artist-choices-container' layout='row' layout-align='center center'>
            <div ng-repeat='artist in $ctrl.artists track by $index' class='artist-container' ng-class='{"hide-artist": $ctrl.artistChosen && !artist.selected}'>
                <md-tooltip md-direction='top' ng-bind='artist.name'></md-tooltip>
                <img class='artist-image' ng-class='{"highlight-selected-artist": artist.selected}' ng-click='$ctrl.selectArtist(artist, $index)' ng-src='{{artist.spotifyThumbnail.url}}' />
            </div>
            <p ng-if='$ctrl.artists.length === 0'>No influencers found for this artist.</p>
        </div>`,
    controller: function($scope, $state, $animate, $stateParams, StateService) {
        this.selectArtist = (selectedArtist, index) => {
            this.artistChosen = true;
            selectedArtist.selected = true;

            let artistContainers = document.getElementsByClassName('artist-container');

            $animate.addClass(artistContainers[index], 'hide-selected-artist').then(() => {
                if ($stateParams.artistThumbnailInfo) {
                    StateService.previousArtists.push(angular.copy($stateParams.artistThumbnailInfo));
                }
                $state.go('discover', { artistThumbnailInfo: selectedArtist });
            });
        };
    }
});
