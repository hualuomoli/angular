(function() {
  'use strict';

  angular
    .module('nstp.dashboard')
    .config(router);

  /** @ngInject */
  function router($stateProvider) {

    $stateProvider
      .state('nstp.dashboard-v1', {
        url: '/dashboard-v1',
        templateUrl: 'nstp/tpl/app_dashboard_v1.html',
        controller: 'dashboardNstpCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load([
                'app/nstp/dashboard/dashboard.controller.js'
              ]);
            }
          ]
        }
      })

  }

})();