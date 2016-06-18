(function() {
  'use strict';

  angular
    .module('hma')
    .config(router);

  /** @ngInject */
  function router($stateProvider) {

    $stateProvider
      .state('hma', {
        abstract: true,
        url: '/hma',
        templateUrl: 'tpl/hma/app.html',
        controller: 'HmaAppCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load([
                'css/animate.css',
                'css/app.css',
                'css/font.css',
                'app/hma/hma.controller.js'
              ]);
            }
          ]
        }
      })

  }

})();