/* jshint esversion:6 */

app.component('sampleTracks', {
    restrict: 'E',
    bindings: {
        tracks: '<'
    },
    template: `
        <md-list ng-cloak>
            <div layout='row' class='sample-tracks__container'>
                <h4 flex class='sample-tracks__title md-title md-no-sticky'>Sample Tracks</h4>
                <md-switch flex='nogrow' class='sample-tracks__autoplay-switch' ng-model='$ctrl.StateService.autoPlayState'>Autoplay</md-switch>
            </div>
            <md-list-item ng-repeat='track in $ctrl.tracks track by $index' layout='row' layout-align='space-between center' ng-click='$ctrl.playTrack(track, $index)' aria-label='Sample Track'>
                <img flex='none' ng-src='{{track.image.url}}' class='sample-tracks__image materal-padding'/>
                <div flex='auto' class='sample-tracks__text'>
                    <div class='md-body-2 truncate' ng-bind='track.name'></div>
                    <div class='md-caption truncate' ng-bind='track.albumName'></div>
                </div>
                <div flex='none' ng-click='$ctrl.playTrack(track, $index)' class='sample-tracks__play-icon materal-padding'>
                    <i class='fa fa-lg' ng-class="track.isPlaying ? 'fa-play' : 'fa-pause'"></i>
                    <md-progress-circular md-mode='determinate' value='{{track.progressValue}}' md-diameter='64' class='fade' ng-show='track.isPlaying'></md-progress-circular>
                </div>
            </md-list-item>
        </md-list>
        <audio id='audioTag'></audio>`,
    controller: function($scope, $sce, $interval, StateService) {
        this.StateService = StateService;
        let audioElement = document.getElementById('audioTag');
        let thisDiscoverStateID = this.StateService.currentDiscoverStateID;
        let stopFunction;
        audioElement.volume = '0.1';
        audioElement.onwaiting = () => {
            this.stopAnimation();
        };
        this.playTrack = (selectedTrack, selectedIndex) => {
            if (selectedTrack.isPlaying) {
                audioElement.pause();
                selectedTrack.isPlaying = false;
                selectedTrack.progressValue = 0;
                $interval.cancel(stopFunction);
            } else {
                audioElement.src = $sce.trustAsResourceUrl(selectedTrack.previewUrl);
                audioElement.play();
                this.tracks.forEach((track, index)=> {
                    if (index === selectedIndex) {
                        track.progressValue = 0;
                        track.isPlaying = true;
                        this.stopAnimation();
                        audioElement.oncanplay = () => {
                            stopFunction = this.startAnimation(track, index);
                        };
                    } else {
                        track.isPlaying = false;
                        track.progressValue = 0;
                    }
                });
            }
        };

        this.stopAnimation = () => {
            $interval.cancel(stopFunction);
        };

        this.startAnimation = (track, index) => {
            return $interval(() => {
                track.progressValue += (1/3);
                if (track.progressValue >= 100) {
                    this.stopAnimation();
                    track.isPlaying = false;
                    track.progressValue = 0;

                    let nextTrackIndex = index + 1;
                    let currentDiscoverStateID = this.StateService.currentDiscoverStateID;
                    if (this.StateService.autoPlayState && thisDiscoverStateID === currentDiscoverStateID && this.tracks[nextTrackIndex]) {
                        this.playTrack(this.tracks[nextTrackIndex], nextTrackIndex);
                    } 
                }
            }, 100);
        };

        $scope.$watch(() => this.tracks, () => {
            if (this.StateService.autoPlayState && this.tracks) {
                this.playTrack(this.tracks[0], 0);
            }
        }, false);
    }
});
