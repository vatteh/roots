/* jshint esversion:6 */

app.component('sampleTracks', {
    restrict: 'E',
    bindings: {
        tracks: '<'
    },
    template: `
        <div layout='row'>
            <md-list ng-cloak style='width: 100%;'>
                <div layout='row' class='sample-tracks__container'>
                    <h4 flex class='sample-tracks__title md-title md-no-sticky'>Sample Tracks</h4>
                    <md-switch flex='nogrow' class='sample-tracks__autoplay-switch' ng-model='$ctrl.StateService.autoPlayState' aria-label='Auto play sample songs'>Autoplay</md-switch>
                </div>
                <md-list-item ng-repeat='track in $ctrl.tracks track by $index' layout='row' layout-align='space-between center' ng-click='$ctrl.playTrack(track, $index)'>
                    <img flex='none' ng-src='{{track.image.url}}' class='sample-tracks__image materal-padding'/>
                    <div flex='auto' class='sample-tracks__text'>
                        <div class='md-body-2 truncate' ng-bind='track.name'></div>
                        <div class='md-caption truncate' ng-bind='track.albumName'></div>
                    </div>
                    <div flex='none' class='sample-tracks__play-icon materal-padding'>
                        <i class='fa fa-lg' ng-class="track.isPlaying ? 'fa-play' : 'fa-pause'"></i>
                        <md-progress-circular md-mode='determinate' value='{{track.timeElapsed}}' md-diameter='64' class='fade' ng-show='track.isPlaying'></md-progress-circular>
                    </div>
                </md-list-item>
            </md-list>
            <audio id='audioTag'></audio>
        </div>`,
    controller: function($scope, $sce, $interval, StateService) {
        this.StateService = StateService;
        let audioElement = document.getElementById('audioTag');
        let stopFunction;
        audioElement.volume = '0.1';
        this.playTrack = (selectedTrack, selectedIndex) => {
            if (selectedTrack.isPlaying) {
                audioElement.pause();
                selectedTrack.isPlaying = false;
                selectedTrack.timeElapsed = 0;
                $interval.cancel(stopFunction);
            } else {
                audioElement.src = $sce.trustAsResourceUrl(selectedTrack.previewUrl);
                audioElement.play();
                this.tracks.forEach((track, index)=> {
                    if (index === selectedIndex) {
                        track.timeElapsed = 0;
                        track.isPlaying = true;
                        $interval.cancel(stopFunction);
                        stopFunction = $interval(count => {
                            track.timeElapsed = count / 3;
                            if (count >= 300) {
                                track.isPlaying = false;
                            }
                        }, 100, 300);
                    } else {
                        track.isPlaying = false;
                        track.timeElapsed = 0;
                    }
                });
            }
        };

        $scope.$watch(() => this.tracks, () => {
            if (this.StateService.autoPlayState && this.tracks) {
                this.playTrack(this.tracks[0], 0);
            }
        }, false);
    }
});
