/* jshint esversion:6 */

app.directive('fullstackLogo', () => {
    return {
        restrict: 'E',
        template: `<img src="https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/42/fullstack.png"/>`
    };
});
