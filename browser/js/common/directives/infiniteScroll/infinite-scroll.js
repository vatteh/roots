/* jshint esversion:6 */

app.directive('infiniteScroll', ($window) => {
    return {
 		link: (scope, element, attrs) => {
            let currentlyFetching = false;
            return angular.element($window).bind('scroll', () => {
                let scrollableHeight = element.prop('scrollHeight');
                let currentScrollHeight = $window.scrollY + $window.innerHeight;
                
                if (!currentlyFetching && (scrollableHeight <= currentScrollHeight)) {
                	currentlyFetching = true;
                    scope.$apply(attrs.infiniteScroll).then(() => {
                        currentlyFetching = false;
                    });
                }
            });
        }
    };
});
