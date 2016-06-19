(function() {
  'use strict';

  angular
    .module('nstp')
    .config(router);

  /** @ngInject */
  function router($stateProvider) {

    $stateProvider
      .state('nstp', {
        abstract: true,
        url: '/nstp',
        templateUrl: 'nstp/index.html',
        controller: 'nstpCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load([
                'nstp/css/animate.css',
                'nstp/css/font.css',
                'nstp/css/app.css',
                'app/nstp/nstp.controller.js'
              ]);
            }
          ]
        }
      })

  }

})();