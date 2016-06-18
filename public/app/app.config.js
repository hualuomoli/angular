(function() {
  'use strict';

  angular
    .module('app')
    .constant('defaultUrl', 'hma/dashboard-v1')
    .constant('vendor', {
      screenfull: [
        'bower_components/screenfull/dist/screenfull.min.js'
      ]
    })
    .run(run)
    .config(config);

  // 运行时,绑定路由到跟scope下
  /** @ngInject */
  function run($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  /** @ngInject */
  function config($locationProvider, $httpProvider) {

    // 配置路径格式
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);

    // 支持跨域
    $httpProvider.defaults.withCredentials = true;
    // 拦截器(拦截请求)
    // 如权限验证,请求前增加cookie,请求后设置cookie
    // 如用户未登录处理
    // $httpProvider.interceptors.push('userInterceptor');
    // 

  }

})();