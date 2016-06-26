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
        templateUrl: 'nstp/tpl/app.html',
        controller: 'nstpCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load([
                '../../nstp/css/animate.css',
                '../../nstp/css/font.css',
                '../../nstp/css/app.css',
                'app/nstp/nstp.service.js',
                'app/nstp/nstp.controller.js'
              ]);
            }
          ]
        }
      })
    // end
  }

})();