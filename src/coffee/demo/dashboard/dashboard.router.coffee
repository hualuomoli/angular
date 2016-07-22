angular.module 'demo.dashboard'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('demo.dashboard', {
      abstract: true,
      url: '/dashboard',
      template: '<div ui-view fadeInRight></div>',
    })


]