/* jshint esversion:6 */

app.component('influencerTimeline', {
    restrict: 'E',
    template: `
        <div layout='row' layout-align='start center'>
            <div ng-repeat='artist in $ctrl.previousArtists track by $index' class='artist-timeline-button'>
                <i ng-if='$index > 0' class='fa fa-arrow-right' aria-hidden='true'></i>
                <md-button ng-click='$ctrl.selectArtist(artist, $index)' class='md-fab md-mini' ng-class='{"artist-timeline-button__selected": artist.selected_on_timeline}' aria-label='Artist Timeline' style='margin-left: 0'>
                    <img ng-src='{{artist.spotifyThumbnail.url}}' class='artist-timeline-image'/>
                    <md-tooltip md-direction='bottom' ng-bind='artist.name'></md-tooltip>
                </md-button>
            </div>
        </div>`,
    controller: function($state, $animate, $q, StateFactory) {
        this.previousArtists = StateFactory.previousArtists;
        this.selectArtist = (selectedArtist, selectedIndex) => {
            selectedArtist.selected_on_timeline = true;
            let artistButtons = document.getElementsByClassName('artist-timeline-button');
            let artistsToRemove = Array.prototype.filter.call(artistButtons, (element, index) => {
                return index >= selectedIndex;
            });

            for (let i = artistsToRemove.length - 1; i >= 0; i--) {
                if (i === 0) {
                    angular.element(artistsToRemove[i]).css('transition', 'all 0.2s ease-out');
                } else {
                    angular.element(artistsToRemove[i]).css('transition', 'all 0.1s ease-out');
                    angular.element(artistsToRemove[i]).addClass('artist-timeline-button__hide');
                }
            }

            $animate.addClass(artistsToRemove[0], 'artist-timeline-button__hide').then(() => {
                this.previousArtists.length = selectedIndex;
                selectedArtist.selected_on_timeline = false;
                $state.go('discover', { artistThumbnailInfo: selectedArtist });
            });
        };
    }
});
