angular.module 'demo'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('demo', {
      url: '/demo',
      template: '<div ui-view></div>'
    })


]