angular.module 'demo'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('demo', {
      url: '/demo',
      template: 'demo file <div ui-view></div>'
    })


]