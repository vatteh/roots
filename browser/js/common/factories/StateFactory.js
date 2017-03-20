/* jshint esversion:6 */
app.factory('StateFactory', () => {
    return {
        autoPlayState: true,
        currentDiscoverStateID: 0,
        previousArtists: []
    };
});
