(function () {
  'use strict';

  angular
    .module('app')
    .config(router);

  /** @ngInject */
  function router($stateProvider, $urlRouterProvider, defaultUrl) {

    // 默认路由
    $urlRouterProvider.otherwise(defaultUrl);

    // app 跟路由,不能直接访问
    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'tpl/app.html'
      })

  }

})();