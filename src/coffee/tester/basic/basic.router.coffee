angular.module 'tester.basic'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('tester.basic', {
      url: '/basic',
      template: '<div ui-view></div>'
    })


]