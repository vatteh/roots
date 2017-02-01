/* jshint esversion:6 */

app.component('sampleTracks', {
    restrict: 'E',
    bindings: {
        tracks: '<'
    },
    template: `
        <div class='row'>
            <div ng-repeat='track in $ctrl.tracks track by $index' class='track-item col-sm-4' ng-click='$ctrl.playTrack(track, $index)'>
                <img class='track-item--image' ng-src='{{track.image.url}}' style='display: inline-block;'/>
                <span class='song-item--title' ng-bind='track.name'></span>
                <i class='fa' ng-class="track.isPlaying ? 'fa-play' : 'fa-pause'"></i>
            </div>
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
