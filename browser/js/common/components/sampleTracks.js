/* jshint esversion:6 */

app.component('sampleTracks', {
    restrict: 'E',
    bindings: {
        tracks: '<'
    },
    template: `
        <div layout='row'>
            <md-list ng-cloak style='width: 100%;'>
                <md-subheader class='md-no-sticky'>Sample Tracks</md-subheader>
                <md-list-item ng-repeat='track in $ctrl.tracks track by $index' layout='row' layout-align='space-between center' ng-click='$ctrl.playTrack(track, $index)'>
                    <img flex='none' ng-src='{{track.image.url}}' class='sample-tracks__image materal-padding'/>
                    <div flex='auto' class='sample-tracks__text'>
                        <div class='md-body-2 truncate' ng-bind='track.name'></div>
                        <div class='md-caption truncate' ng-bind='track.albumName'></div>
                    </div>
                    <div flex='none' class='sample-tracks__play-icon materal-padding'>
                        <i class='fa fa-lg' ng-class="track.isPlaying ? 'fa-play' : 'fa-pause'"></i>
                    </div>
                </md-list-item>
            </md-list>
            <iframe id='iframe' width='0' height='0' class='visibility: none' frameborder='0'>
        </div>`,
    controller: function($sce) {
        let iframeElement = angular.element(document.querySelector('#iframe'));
        this.playTrack = (selectedTrack, selectedIndex) => {
            if (selectedTrack.isPlaying) {
                iframeElement.attr('src', null);
                selectedTrack.isPlaying = false;
            } else {
                iframeElement.attr('src', $sce.trustAsResourceUrl(selectedTrack.previewUrl));
                this.tracks.forEach((track, index)=> {
                    if (index === selectedIndex) {
                        track.isPlaying = true;
                    } else {
                        track.isPlaying = false;
                    }
                });
            }
        };
    }
});
