angular.module 'demo.dashboard'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('demo.dashboard', {
      url: '/dashboard',
      template: 'this is demo a dashboard file'
    })


]