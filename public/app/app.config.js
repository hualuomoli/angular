(function() {
  'use strict';

  var app = angular
    .module('app')
    .constant('serverUrl', '') // 远程服务端地址
    .value('tokenHeader', {}) // 权限token的header
    // .constant('defaultUrl', 'nstp/dashboard-v1')
    .run(run)
    // .config(appConfig)
    .config(config);

  // 运行时,绑定路由到跟scope下
  /** @ngInject */
  function run($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  // /** @ngInject */
  // function appConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {
  //   // lazy controller, directive and service
  //   app.controller = $controllerProvider.register;
  //   app.directive = $compileProvider.directive;
  //   app.filter = $filterProvider.register;
  //   app.factory = $provide.factory;
  //   app.service = $provide.service;
  //   app.constant = $provide.constant;
  //   app.value = $provide.value;
  // }

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