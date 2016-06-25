(function() {
  'use strict';

  angular
    .module('nstp')
    .config(router);

  /** @ngInject */
  function router($stateProvider) {

    // app 跟路由,不能直接访问
    $stateProvider
      .state('nstp', {
        abstract: true,
        url: '/nstp',
        templateUrl: 'tpl/app.html',
        controller: 'nstpCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load([
                '../../nstp/css/animate.css',
                '../../nstp/css/font.css',
                '../../nstp/css/app.css',
                'app/nstp/nstp.controller.js'
              ]);
            }
          ]
        }
      })
      .state('nstp.dashboard-v1', {
        url: '/dashboard-v1',
        templateUrl: 'tpl/ui_toaster.html'
      })

  }

})();