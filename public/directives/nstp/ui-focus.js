(function() {
  'use strict';

  angular.module('app')
    .directive('nstpUiFocus', nstpUiFocus);

  /** @ngInject */
  function nstpUiFocus($timeout, $parse) {
    return {
      link: function(scope, element, attr) {
        var model = $parse(attr.nstpUiFocus);
        scope.$watch(model, function(value) {
          if (value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function() {
          scope.$apply(model.assign(scope, false));
        });
      }
    };
  }

})();