(function () {
  'use strict';

  // 公网环境

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
        modules: [
          // app
          {
            name: 'app',
            files: [
              // 字体库
              'http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css',
              // 加载样式
              'http://cdn.bootcss.com/simple-line-icons/2.3.1/css/simple-line-icons.min.css',
              // bootstrap
              'http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css',
              'http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js',
              // html转换
              'http://cdn.bootcss.com/angular.js/1.5.6/angular-sanitize.min.js',
              // 动画
              'http://cdn.bootcss.com/angular.js/1.5.6/angular-animate.min.js',
              // cookie
              'http://cdn.bootcss.com/angular.js/1.5.6/angular-cookies.min.js',
              // 资源加载
              'http://cdn.bootcss.com/angular.js/1.5.6/angular-resource.min.js',
              // 触屏
              'http://cdn.bootcss.com/angular.js/1.5.6/angular-touch.min.js',
              // 本地存储
              'http://cdn.bootcss.com/ngStorage/0.3.10/ngStorage.min.js',
            ]
          }
          // end
        ]
      });

  }


})();