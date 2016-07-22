angular.module 'demo.layout.app'
.config ['themeProvider', (themeProvider)->

   # 路由配置
  themeProvider
    .state('demo.layout.app', {
      url: '/app',
      templateUrl: 'demo/tpl/layout/app.html',
      controller: 'demoLayoutAppCtrl'
    })


]