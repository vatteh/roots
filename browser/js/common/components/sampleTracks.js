/* jshint esversion:6 */

app.component('sampleTracks', {
    restrict: 'E',
    bindings: {
        tracks: '<'
    },
    template: `
        <div class='row'>
            <div ng-repeat='track in $ctrl.tracks' class='track-item col-sm-4' ng-click='$ctrl.playTrack(track)'>
                <img class='track-item--image' ng-src='{{track.image.url}}'/>
                <div class='track-item--details'>
                    <span class='song-item--title' ng-bind='track.name'></span>
                </div>
                <div class='track-item--icon'>
                    <i class='fa fa-play'></i>
                </div>
            </div>
            <iframe width='0' height='0' class='visibility: none' ng-src='{{$ctrl.recording}}' frameborder='0'>
        </div>`,
    controller: function($sce) {
        this.playTrack = track => {
            this.recording = $sce.trustAsResourceUrl(track.previewUrl);
            track.selected = true;
        };
    }
});
