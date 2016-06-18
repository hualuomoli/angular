(function() {
  'use strict';

  angular
    .module('hma.dashboard')
    .config(router);

  /** @ngInject */
  function router($stateProvider) {

    $stateProvider
      .state('hma.dashboard-v1', {
        url: '/dashboard-v1',
        templateUrl: 'tpl/hma/dashboard-v1.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load([
                // 'js/controllers/chart.js'
              ]);
            }
          ]
        }
      })

  }

})();