(function () {
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
        modules: [
          // app
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