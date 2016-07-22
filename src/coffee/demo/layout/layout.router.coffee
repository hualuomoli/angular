angular.module 'demo.layout'
.config ['themeProvider', (themeProvider)->

   # 路由配置
  themeProvider
    .state('demo.layout', {
      abstract: true,
      url: '/layout',
      templateUrl: 'nstp/tpl/layout.html'
    })

]