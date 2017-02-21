/* jshint esversion:6 */

app.component('influencerTimeline', {
    restrict: 'E',
    template: `
        <div class='influencer-timeline-container' layout='row' layout-align='start center'>
            <div ng-repeat='artist in $ctrl.previousArtists track by $index' class='artist-timeline-container'>
                <md-button flex='none' class='md-fab md-mini' aria-label='Previous Artist'>
                    <img ng-src='{{artist.spotifyThumbnail.url}}' class='artist-timeline-image'/>
                    <md-tooltip md-direction='bottom' ng-bind='artist.name'></md-tooltip>
                </md-button>
            </div>
        </div>`,
    controller: function($state, $animate, StateService) {
        this.previousArtists = StateService.previousArtists;
        this.selectPreviousArtist = (selectedArtist, index) => {
            let artistContainers = document.getElementsByClassName('artist-container');

            $animate.addClass(artistContainers[index], 'hide-selected-artist').then(() => {
                $state.go('discover', { artistThumbnailInfo: selectedArtist });
            });
        };
    }
});
