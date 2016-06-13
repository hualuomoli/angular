(function () {
  'use strict';

  angular
    .module('app')
    .constant('defaultUrl', '/app/dashboard-v1') // 默认路由
    .run(run)
    .config(config);

  // 运行时,绑定路由到跟scope下
  /** @ngInject */
  function run($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  /** @ngInject */
  function config($locationProvider, $httpProvider, $ocLazyLoadProvider) {

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

    // 懒加载
    $ocLazyLoadProvider
      .config({
        debug: true,
        events: true,
        modules: [
          // app
          // 内网环境
          {
            name: 'app',
            files: [
              // 字体库
              'bower_components/font-awesome/css/font-awesome.min.css',
              // 加载样式
              'bower_components/simple-line-icons/css/simple-line-icons.css',
              // bootstrap
              'bower_components/bootstrap/dist/css/bootstrap.min.css',
              'bower_components/bootstrap/dist/js/bootstrap.min.js',
              // html转换
              'bower_components/angular-sanitize/angular-sanitize.min.js',
              // 动画
              'bower_components/angular-animate/angular-animate.min.js',
              // cookie
              'bower_components/angular-cookies/angular-cookies.min.js',
              // 资源加载
              'bower_components/angular-resource/angular-resource.min.js',
              // 触屏
              'bower_components/angular-touch/angular-touch.min.js',
              // 本地存储
              'bower_components/ngstorage/ngStorage.min.js'
            ]
          }
          // end
        ]
      });

  }


})();