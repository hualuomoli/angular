angular.module 'tester.basic.menu'
.config ['themeProvider', (themeProvider)->

  # 路由配置
  themeProvider
    .state('tester.basic.menu', {
      url: '/menu',
      template: 'this is tester basic menu html',
      # controller: 'testerbasicV1Ctrl'
    })


]