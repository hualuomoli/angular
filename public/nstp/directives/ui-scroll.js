(function() {
  'use strict';

  angular.module('app')
    .directive('nstpUiScroll', nstpUiScroll);

  /** @ngInject */
  function nstpUiScroll($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.nstpUiScroll);
          $anchorScroll();
        });
      }
    };
  }

})();