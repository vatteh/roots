app.directive('infiniteScroll', function($window) {
    return {
 		link: function(scope, element, attrs) {
            var currentlyFetching = false;

            return angular.element($window).bind('scroll', function() {
                var scrollableHeight = element.prop('scrollHeight');
                var currentScrollHeight = $window.scrollY + $window.innerHeight;
                
                if (!currentlyFetching && (scrollableHeight <= currentScrollHeight)) {
                	currentlyFetching = true;
                    scope.$apply(attrs.infiniteScroll).then(function() {
                    	currentlyFetching = false;
                    });
                }
            });
        }
    };
});
