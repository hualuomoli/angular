(function() {
    'use strict';

    angular.module('app')
        .directive('nstpSetNgAnimate', nstpSetNgAnimate);

    /** @ngInject */
    function nstpSetNgAnimate($animate) {
        return {
            link: function($scope, $element, $attrs) {
                $scope.$watch(function() {
                    return $scope.$eval($attrs.nstpSetNgAnimate, $scope);
                }, function(valnew, valold) {
                    $animate.enabled(!!valnew, $element);
                });
            }
        };
    }

})();