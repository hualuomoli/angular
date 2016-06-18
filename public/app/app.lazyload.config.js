(function() {
  'use strict';

  // 内网环境

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($ocLazyLoadProvider) {

    // 懒加载
    $ocLazyLoadProvider
      .config({
        debug: true,
        events: true,
        modules: [{ // app
          name: 'app',
          files: [

          ]
        }]
      });

  }

})();