angular.module('app')
  .directive('nstpUiScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.nstpUiScroll);
          $anchorScroll();
        });
      }
    };
  }]);